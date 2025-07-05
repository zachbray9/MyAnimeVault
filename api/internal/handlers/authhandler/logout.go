package authhandler

import (
	"myanimevault/internal/services"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func LogoutHandler(context *gin.Context) {
	userId := context.GetString("userId")

	refreshToken, err := context.Cookie("refreshToken")

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "refresh_token_not_found"})
	}

	err = services.RevokeRefreshToken(userId, refreshToken)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
		return
	}

	cookie := &http.Cookie{
		Name:     "refreshToken",
		Value:    "",
		Path:     "/",
		Expires:  time.Now(),
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(context.Writer, cookie)

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged out."})
}
