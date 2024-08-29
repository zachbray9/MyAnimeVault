package controllers

import (
	"myanimevault/models/dtos"
	"myanimevault/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateUserAnime(context *gin.Context) {
	var userAnime dtos.UserAnimeDto

	err := context.ShouldBindJSON(&userAnime)

	if(err != nil){
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was an issue with one or more of the fields in the userAnime"})
		return
	}

	userId := context.GetString("userId")
	
	err = services.AddAnimeToList(userId, userAnime)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem adding the new userAnime to the database"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "New userAnime was successfully added to the database"})
}

func GetUserAnimeList(context *gin.Context){
	userId := context.GetString("userId")

	animeList, err := services.GetList(userId)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem retrieving the users list"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "List successfully retrieved.", "Anime List": animeList})
}