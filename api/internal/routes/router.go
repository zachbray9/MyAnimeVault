package routes

import (
	"myanimevault/internal/handlers/authhandler"
	"myanimevault/internal/handlers/useranimehandler"
	"myanimevault/internal/middleware"

	"github.com/gin-gonic/gin"
)

func InitRouter(server *gin.Engine) {
	//auth routes
	server.GET("/api/users/getCurrentUser", middleware.Authenticate, authhandler.GetCurrentUserHandler)
	server.POST("/api/users/register", authhandler.RegisterHandler)
	server.POST("/api/users/login", authhandler.LoginHandler)
	server.DELETE("/api/users/logout", authhandler.LogoutHandler)

	//userAnime routes
	server.GET("/api/user/anime", middleware.Authenticate, useranimehandler.GetUserListHandler)
	server.GET("/api/user/anime/:animeId", middleware.Authenticate, useranimehandler.GetUserAnimeHandler)
	server.POST("/api/user/anime", middleware.Authenticate, useranimehandler.AddToListHandler)
	server.PATCH("/api/user/anime/:animeId", middleware.Authenticate, useranimehandler.UpdateUserAnimeHandler)
	server.DELETE("/api/user/anime/:animeId", middleware.Authenticate, useranimehandler.DeleteUserAnimeHandler)
}