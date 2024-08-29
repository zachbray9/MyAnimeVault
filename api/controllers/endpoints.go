package controllers

import (
	"myanimevault/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterEndpoints(server *gin.Engine) {
	//auth routes
	server.GET("/api/users/getCurrentUser", middleware.Authenticate, getCurrentUser)
	server.POST("/api/users/register", register)
	server.POST("/api/users/login", login)

	//userAnime routes
	server.POST("/api/userAnime", middleware.Authenticate, CreateUserAnime)
	server.GET("/api/userAnime", middleware.Authenticate, GetUserAnimeList)
}