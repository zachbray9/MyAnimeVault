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
	server.GET("/api/users/refresh", refresh)

	//userAnime routes
	server.GET("/api/user/anime", middleware.Authenticate, GetUserAnimeList)
	server.GET("/api/user/anime/:animeId", middleware.Authenticate, GetUserAnimeDetails)
	server.POST("/api/user/anime", middleware.Authenticate, CreateUserAnime)
	server.PATCH("/api/user/anime/:animeId", middleware.Authenticate, UpdateUserAnime)
}