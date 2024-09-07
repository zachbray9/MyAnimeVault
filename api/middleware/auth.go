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

	claims, err := services.VerifyAuthToken(authToken)

	if(err != nil){
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Not authorized."})
	}

	userId := claims["id"].(string)
	userEmail := claims["email"].(string)

	context.Set("userId", userId)
	context.Set("userEmail", userEmail)
	context.Next()
}