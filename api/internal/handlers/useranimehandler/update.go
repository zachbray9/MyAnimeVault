package useranimehandler

import (
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/requests"
	"myanimevault/internal/services/useranimeservice"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func UpdateUserAnimeHandler(context *gin.Context) {
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

	err = useranimeservice.Update(userId, animeId, patchRequest)

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
