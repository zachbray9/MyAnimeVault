package authhandler

import (
	"log"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/services/useranimeservice"
	"myanimevault/internal/services/userservice"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetCurrentUserHandler(context *gin.Context) {
	userId := context.GetString("userId")
	parsedUserId, err := uuid.Parse(userId)
	if err != nil {
		log.Printf("failed to parse userId from context: %v", err)
		context.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized", "message": "Session invalid or expired."})
		return
	}

	user, err := userservice.Get(context.Request.Context(), parsedUserId)

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

	animeIdList, err := useranimeservice.GetIdList(userId)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was a problem getting the users anime id list."})
		return
	}

	userDto := dtos.UserDto{}

	userDto.Id = user.Id.String()
	userDto.Email = user.Email
	userDto.AnimeIds = animeIdList

	context.JSON(http.StatusOK, gin.H{"message": "Current user was successfully returned.", "user": userDto})
}
