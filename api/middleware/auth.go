package middleware

import (
	"myanimevault/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context) {
	authToken := context.Request.Header.Get("Authorization")

	if(authToken == ""){
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Not authorized."})
		return
	}

	userId, err := services.VerifyAuthToken(authToken)

	if(err != nil){
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Not authorized."})
	}

	context.Set("userId", userId)
	context.Next()
}