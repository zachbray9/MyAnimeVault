package controllers

import (
	"myanimevault/models/entities"
	"myanimevault/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateUserAnime(context *gin.Context) {
	var userAnime entities.UserAnime

	err := context.ShouldBindJSON(&userAnime)

	if(err != nil){
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was an issue with one or more of the fields in the userAnime"})
		return
	}

	userId := context.GetString("userId")
	parsedUserId, err := uuid.Parse(userId)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem parsing the userId from the context variables into a uuid"})
		return
	}

	userAnime.UserId = parsedUserId
	
	err = services.CreateUserAnime(userAnime)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem adding the new userAnime to the database"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "New userAnime was successfully added to the database"})
}