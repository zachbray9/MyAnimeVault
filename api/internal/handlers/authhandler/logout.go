package authhandler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func LogoutHandler(context *gin.Context) {
	userId := context.GetString("userId")

	//delete session from database

	//

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
