package authhandler

import (
	"log"
	sessionservice "myanimevault/internal/services/session_service"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func LogoutHandler(context *gin.Context) {
	//get session id from cookie
	sessionId, err := context.Cookie("sid")
	if err != nil {
		context.JSON(http.StatusOK, gin.H{"message": "Already logged out."})
		return
	}

	//delete session from database
	err = sessionservice.Delete(context.Request.Context(), sessionId)
	if err != nil {
		log.Printf("sessionservice.Delete: failed to delete the session from the database: %v", err)
		context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error", "message": "Something went wrong. Please try again later."})
		return
	}
	//

	sessionIdCookie := &http.Cookie{
		Name:     "sid",
		Value:    "",
		Path:     "/",
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	deviceIdCookie := &http.Cookie{
		Name:     "did",
		Value:    "",
		Path:     "/",
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}

	http.SetCookie(context.Writer, sessionIdCookie)
	http.SetCookie(context.Writer, deviceIdCookie)

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged out."})
}
