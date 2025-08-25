package routes

import (
	"fmt"
	animehandler "myanimevault/internal/handlers/anime_handler"
	"myanimevault/internal/handlers/authhandler"
	imagehandler "myanimevault/internal/handlers/image_handler"
	"myanimevault/internal/handlers/useranimehandler"
	"myanimevault/internal/middleware"
	animerepo "myanimevault/internal/repository/anime"
	animeservice "myanimevault/internal/services/anime"
	imageservice"myanimevault/internal/services/image_service"
	"os"

	"github.com/gin-gonic/gin"
)

func InitRouter(server *gin.Engine) {
	//initialize dependencies
	imageService, err := imageservice.NewImageService(os.Getenv("AWS_S3_REGION"), os.Getenv("AWS_S3_BUCKET_NAME"))
	if err != nil {
		panic(fmt.Sprintf("failed to create new image service: %v", err))
	}
	animeRepo := animerepo.NewAnimeRepository()
	animeService := animeservice.NewAnimeService(animeRepo, imageService)

	animeHandler := animehandler.NewAnimeHandler(animeService)
	imageHandler := imagehandler.NewImageHandler(imageService)



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

	//anime routes
	api.POST("/anime", animeHandler.AddAnimeHandler)

	//image routes
	api.POST("/image/upload", imageHandler.UploadImageHandler)
}


