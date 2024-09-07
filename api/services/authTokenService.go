package services

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateAuthToken(id string, email string) (string, error){
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": id,
		"email": email,
		"exp": time.Now().Add(time.Minute * 10).Unix(),
	})

	var authTokenKey string = os.Getenv("AUTH_TOKEN_KEY")

	return token.SignedString([]byte(authTokenKey))
}

func GenerateRefeshToken(id string, email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": id,
		"email": email,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	var authTokenKey string = os.Getenv("AUTH_TOKEN_KEY")

	return token.SignedString([]byte(authTokenKey))
}

func VerifyAuthToken(token string) (jwt.MapClaims, error){
	claims := jwt.MapClaims{}

	parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if(!ok){
			return nil, errors.New("unexpected signing method")
		}
		return []byte(os.Getenv("AUTH_TOKEN_KEY")), nil
	})

	if(err != nil){
		return claims, fmt.Errorf("invalid auth token: %w", err)
	}

	tokenIsValid := parsedToken.Valid

	if(!tokenIsValid){
		return claims, fmt.Errorf("invalid auth token")
	}


	return claims, nil
}