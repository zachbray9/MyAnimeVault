package useranimehandler

import (
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddToListHandler(context *gin.Context) {
	var userAnime dtos.UserAnimeDto

	err := context.ShouldBindJSON(&userAnime)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was an issue with one or more of the fields in the userAnime"})
		return
	}

	userId := context.GetString("userId")

	err = services.AddAnimeToList(userId, userAnime)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem adding the new userAnime to the database"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "New userAnime was successfully added to the database"})
}
