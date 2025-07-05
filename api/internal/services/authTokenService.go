package services

import (
	"database/sql"
	"errors"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/utils"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func GenerateAuthToken(id string, email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    id,
		"email": strings.ToLower(email),
		"exp":   time.Now().Add(time.Minute * 10).Unix(),
	})

	var authTokenKey string = os.Getenv("AUTH_TOKEN_KEY")

	return token.SignedString([]byte(authTokenKey))
}

func GenerateRefreshToken(id string, email string, expiresAt int64) (string, string, error) {
	tokenId := uuid.New().String()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":      id,
		"email":   strings.ToLower(email),
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
	VALUES ($1, $2, $3, $4)
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("an error occurred while preparing the db query: %w", err)
	}

	hashedToken := utils.HashToken(token)

	defer stmt.Close()
	_, err = stmt.Exec(tokenId, userId, hashedToken, expiresAt)

	if err != nil {
		return fmt.Errorf("an error occurred while executing the query statement: %w", err)
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

func ValidateRefreshToken(userId string, tokenId string, token string) error {
	hashedToken := utils.HashToken(token)

	query := `
	SELECT revoked_at
	FROM refreshTokens
	WHERE user_id = $1 AND token_hash = $2
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("an error occurred while preparing the db query: %w", err)
	}

	defer stmt.Close()
	row := stmt.QueryRow(userId, hashedToken)

	var revokedAt sql.NullTime

	err = row.Scan(&revokedAt)

	if err != nil {
		return fmt.Errorf("an error occurred while scanning the db row: %w", err)
	}

	if revokedAt.Valid {
		return customErrors.ErrRevokedToken
	}

	return nil
}

func RevokeRefreshToken(userId string, token string) error {
	hashedToken := utils.HashToken(token)

	query := `
	UPDATE refreshTokens
	SET revoked_at = $1
	WHERE user_id = $2 AND token_hash = $3
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("an error occurred while preparing the db query: %w", err)
	}

	defer stmt.Close()
	_, err = stmt.Exec(time.Now(), userId, hashedToken)

	if err != nil {
		return fmt.Errorf("an error occurred while executing the query statement: %w", err)
	}

	return nil
}
