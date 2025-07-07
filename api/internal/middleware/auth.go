package middleware

import (

	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context) {
	//check if there is a valid session in the database, then return user details

	//

	context.Set("userId", userId)
	context.Set("userEmail", userEmail)
	context.Next()
}