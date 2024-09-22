package controllers

import (
	"myanimevault/models/customErrors"
	"myanimevault/models/dtos"
	"myanimevault/models/requests"
	"myanimevault/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateUserAnime(context *gin.Context) {
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

func GetUserAnimeList(context *gin.Context) {
	userId := context.GetString("userId")

	animeList, err := services.GetList(userId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem retrieving the users list"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "List successfully retrieved.", "animeList": animeList})
}

func GetUserAnimeDetails(context *gin.Context) {
	userId := context.GetString("userId")
	animeId, err := strconv.ParseInt(context.Param("animeId"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_anime_id"})
		return
	}

	var userAnime dtos.UserAnimeDetailsDto = dtos.UserAnimeDetailsDto{}

	err = services.GetUserAnimeDetails(userId, animeId, &userAnime)

	if err != nil {
		switch err {
		case customErrors.ErrNotFound:
			context.JSON(http.StatusNotFound, gin.H{"error": "not_found"})
			return
		default:
			context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
			return
		}
	}

	context.JSON(http.StatusOK, gin.H{"message": "successfully retrieved UserAnime details.", "userAnime": userAnime})
}

func UpdateUserAnime(context *gin.Context) {
	userId := context.GetString("userId")
	animeId, err := strconv.ParseInt(context.Param("animeId"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_anime_id"})
		return
	}

	var patchRequest requests.UserAnimePatchRequest
	err = context.ShouldBindJSON(&patchRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_field"})
		return
	}

	err = services.UpdateUserAnime(userId, animeId, patchRequest)

	if err != nil {
		switch err {
		case customErrors.ErrInvalidField:
			context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_field"})
			return
		case customErrors.ErrNotFound:
			context.JSON(http.StatusNotFound, gin.H{"error": "not_found"})
			return
		default:
			context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
			return
		}
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully updated the UserAnime."})
}

func DeleteUserAnime(context *gin.Context) {
	userId := context.GetString("userId")

	animeId, err := strconv.ParseInt(context.Param("animeId"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_anime_id"})
		return
	}

	err = services.DeleteUserAnime(userId, animeId)

	if err != nil {
		switch err {
		case customErrors.ErrNotFound:
			context.JSON(http.StatusNotFound, gin.H{"error": "anime_not_found"})
			return
		default:
			context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
			return
		}
	}

	context.JSON(http.StatusOK, gin.H{"message": "Anime was successfully deleted from your list."})
}
