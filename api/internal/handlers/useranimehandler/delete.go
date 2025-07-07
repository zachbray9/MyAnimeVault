package useranimehandler

import (
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/services/useranimeservice"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func DeleteUserAnimeHandler(context *gin.Context) {
	userId := context.GetString("userId")

	animeId, err := strconv.ParseInt(context.Param("animeId"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_anime_id"})
		return
	}

	err = useranimeservice.Delete(userId, animeId)

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
