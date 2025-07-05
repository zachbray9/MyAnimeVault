package authhandler

import (
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCurrentUserHandler(context *gin.Context) {
	userId := context.GetString("userId")
	userEmail := context.GetString("userEmail")

	userDto, err := services.GetUserById(userId)

	if err != nil {
		switch err {
		case customErrors.ErrNotFound:
			context.JSON(http.StatusNotFound, gin.H{"error": "user_not_found"})
			return
		default:
			context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
			return
		}
	}

	animeIdList, err := services.GetIdList(userId)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was a problem getting the users anime id list."})
		return
	}

	token, err := services.GenerateAuthToken(userId, userDto.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating an auth token."})
		return
	}

	userDto.Id = userId
	userDto.Email = userEmail
	userDto.AuthToken = token
	userDto.AnimeIds = animeIdList

	context.JSON(http.StatusOK, gin.H{"message": "Current user was successfully returned.", "user": userDto})
}
