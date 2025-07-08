package routes

import (
	"myanimevault/internal/handlers/authhandler"
	"myanimevault/internal/handlers/useranimehandler"
	"myanimevault/internal/middleware"

	"github.com/gin-gonic/gin"
)

func InitRouter(server *gin.Engine) {
	api := server.Group("/api")
	//auth routes
	api.GET("/users/getCurrentUser", middleware.Authenticate, authhandler.GetCurrentUserHandler)
	api.POST("/users/register", authhandler.RegisterHandler)
	api.POST("/users/login", authhandler.LoginHandler)
	api.DELETE("/users/logout", authhandler.LogoutHandler)

	//userAnime routes
	api.GET("/user/anime", middleware.Authenticate, useranimehandler.GetUserListHandler)
	api.GET("/user/anime/:animeId", middleware.Authenticate, useranimehandler.GetUserAnimeHandler)
	api.POST("/user/anime", middleware.Authenticate, useranimehandler.AddToListHandler)
	api.PATCH("/user/anime/:animeId", middleware.Authenticate, useranimehandler.UpdateUserAnimeHandler)
	api.DELETE("/user/anime/:animeId", middleware.Authenticate, useranimehandler.DeleteUserAnimeHandler)
}


