package services

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateAuthToken(id string, email string) (string, error){
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": id,
		"email": email,
		"exp": time.Now().Add(time.Minute * 60).Unix(),
	})

	var authTokenKey string = os.Getenv("AUTH_TOKEN_KEY")

	return token.SignedString([]byte(authTokenKey))
}

func VerifyAuthToken(token string) (string, error){
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if(!ok){
			return nil, errors.New("unexpected signing method")
		}
		return []byte(os.Getenv("AUTH_TOKEN_KEY")), nil
	})

	if(err != nil){
		return "", err
	}

	tokenIsValid := parsedToken.Valid

	if(!tokenIsValid){
		return "", errors.New("invalid auth token")
	}

	claims, ok := parsedToken.Claims.(jwt.MapClaims)

	if(!ok){
		return "", errors.New("invalid auth token claims")
	}

	userId := claims["id"].(string)

	return userId, nil
}