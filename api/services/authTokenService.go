package services

import (
	"database/sql"
	"errors"
	"fmt"
	"myanimevault/database"
	"myanimevault/utils"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func GenerateAuthToken(id string, email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    id,
		"email": email,
		"exp":   time.Now().Add(time.Minute * 10).Unix(),
	})

	var authTokenKey string = os.Getenv("AUTH_TOKEN_KEY")

	return token.SignedString([]byte(authTokenKey))
}



func GenerateRefreshToken(id string, email string, expiresAt int64) (string, string, error) {
	tokenId := uuid.New().String()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":      id,
		"email":   email,
		"exp":     expiresAt,
		"tokenId": tokenId,
	})

	var authTokenKey string = os.Getenv("AUTH_TOKEN_KEY")

	signedToken, err := token.SignedString([]byte(authTokenKey))

	if err != nil {
		return "", "", fmt.Errorf("there was a problem signing the refresh token: %w", err)
	}

	return signedToken, tokenId, nil
}



func StoreRefreshToken(userId string, tokenId string, token string, expiresAt time.Time) error {
	query := `
	INSERT INTO refreshTokens (id, user_id, token_hash, expires_at)
	VALUES (?, ?, ?, ?)
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("there was a problem preparing the db query: %w", err)
	}

	hashedToken := utils.HashToken(token)

	defer stmt.Close()
	_, err = stmt.Exec(tokenId, userId, hashedToken, expiresAt)

	if err != nil {
		return fmt.Errorf("there was a problem executing the query statement: %w", err)
	}

	return nil
}



func VerifyAuthToken(token string) (jwt.MapClaims, error) {
	claims := jwt.MapClaims{}

	parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(os.Getenv("AUTH_TOKEN_KEY")), nil
	})

	if err != nil {
		return claims, fmt.Errorf("invalid auth token: %w", err)
	}

	tokenIsValid := parsedToken.Valid

	if !tokenIsValid {
		return claims, fmt.Errorf("invalid auth token")
	}

	return claims, nil
}



func VerifyRefreshToken(token string) (jwt.MapClaims, error) {
	claims, err := VerifyAuthToken(token)

	if err != nil {
		return claims, fmt.Errorf("invalid or expired refresh token: %w", err)
	}

	userId, ok := claims["id"].(string)

	if !ok {
		return claims, fmt.Errorf("invalid token claims")
	}

	tokenId, ok := claims["tokenId"].(string)

	if !ok {
		return claims, fmt.Errorf("invalid token claims")
	}

	query := `
	SELECT revoked_at
	FROM refreshTokens
	WHERE id = ? AND user_id = ?
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return claims, fmt.Errorf("there was a problem preparing the db query: %w", err)
	}

	defer stmt.Close()
	row := stmt.QueryRow(tokenId, userId)

	var revokedAt sql.NullTime

	err = row.Scan(&revokedAt)

	if err != nil {
		return claims, fmt.Errorf("there was a problem scanning the db row: %w", err)
	}

	if revokedAt.Valid {
		return claims, fmt.Errorf("token has been revoked: %w", err)
	}

	return claims, nil

}



func RevokeRefreshToken(userId string, tokenId string, token string) error {
	query := `
	UPDATE refreshTokens
	SET revoked_at = ?
	WHERE id = ? AND user_id = ?
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("there was a problem preparing the db query: %w", err)
	}

	defer stmt.Close()
	_, err = stmt.Exec(time.Now(), tokenId, userId)

	if err != nil {
		return fmt.Errorf("there was a problem executing the query statement: %w", err)
	}

	return nil
}
