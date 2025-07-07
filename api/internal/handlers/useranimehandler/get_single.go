package useranimehandler

import (
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/services/useranimeservice"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetUserAnimeHandler(context *gin.Context) {
	userId := context.GetString("userId")
	animeId, err := strconv.ParseInt(context.Param("animeId"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_anime_id"})
		return
	}

	var userAnime dtos.UserAnimeDetailsDto = dtos.UserAnimeDetailsDto{}

	err = useranimeservice.GetUserAnime(userId, animeId, &userAnime)

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
