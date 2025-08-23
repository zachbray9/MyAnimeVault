package animehandler

import (
	"myanimevault/internal/models/requests"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *AnimeHandler) AddAnimeHandler(context *gin.Context) {
	var req requests.CreateAnimeRequest
	err := context.ShouldBindJSON(&req)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "there was one or more invalid fields in the create anime request"})
		return
	}

}
