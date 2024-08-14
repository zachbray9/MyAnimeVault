package controllers

import "github.com/gin-gonic/gin"

func RegisterEndpoints(server *gin.Engine) {
	server.POST("/users/register", register)
	server.POST("users/login", login)
	server.GET("users/getUserByEmail/:email", GetUserByEmail)
}