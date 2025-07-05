package services

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func GenerateRefreshTokenCookie(id string, email string, context *gin.Context) error {
	expirationTime := time.Now().Add(time.Hour * 24 * 30)

	refreshToken, tokenId, err := GenerateRefreshToken(id, email, expirationTime.Unix())

	if err != nil {
		return fmt.Errorf("there was a problem generating a refresh token: %w", err)
	}

	err = StoreRefreshToken(id, tokenId, refreshToken, expirationTime)

	if err != nil {
		return fmt.Errorf("there was a problem storing the refresh token in the database: %w", err)
	}

	cookie := &http.Cookie{
		Name:     "refreshToken",
		Value:    refreshToken,
		Path:     "/",
		Expires:  expirationTime,
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(context.Writer, cookie)

	return nil
}