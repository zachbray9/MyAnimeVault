package middleware

import (
	"log"
	"myanimevault/internal/services/sessionservice"
	"myanimevault/internal/services/userservice"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context) {
	//extract session id from session id cookie
	sessionId, err := context.Cookie("sid")

	if err != nil || sessionId == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized", "message": "Session not found."})
		context.Abort()
		return
	}

	//check if there is a valid session in the database, then return user details
		session, err := sessionservice.GetById(context.Request.Context(), sessionId)
		if err != nil || session.IsExpired() {
			log.Printf("Invalid session: %v", err)
			context.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized", "message": "Session invalid or expired."})
			context.Abort()
			return
		}

	//validate user still exists
	user, err := userservice.Get(context.Request.Context(), session.UserId)
	if err != nil {
		log.Printf("User not found for session %s: %v", sessionId, err)
		context.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized", "message": "User no longer exists."})
		context.Abort()
		return
	}

	context.Set("userId", user.Id)
	context.Next()
}