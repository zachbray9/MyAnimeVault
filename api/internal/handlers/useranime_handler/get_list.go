package useranimehandler

import (
	useranimeservice "myanimevault/internal/services/useranime_service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUserListHandler(context *gin.Context) {
	userId := context.GetString("userId")

	animeList, err := useranimeservice.GetList(userId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem retrieving the users list"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "List successfully retrieved.", "animeList": animeList})
}
