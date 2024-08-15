package services

import (
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

	return token.SignedString(authTokenKey)
}