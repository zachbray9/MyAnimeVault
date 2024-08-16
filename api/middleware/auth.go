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

	err := services.VerifyAuthToken(authToken)

	if(err != nil){
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Not authorized."})
	}

	context.Next()
}