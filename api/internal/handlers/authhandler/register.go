package authhandler

import (
	"fmt"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/requests"
	"myanimevault/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterHandler(context *gin.Context) {
	var registerRequest requests.RegisterRequest
	err := context.ShouldBindJSON(&registerRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_fields"})
		return
	}

	if registerRequest.Password != registerRequest.ConfirmPassword {
		context.JSON(http.StatusBadRequest, gin.H{"error": "passwords_do_not_match"})
		return
	}

	userId, err := services.Register(registerRequest.Email, registerRequest.Password)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was an issue registering the user."})
		return
	}

	token, err := services.GenerateAuthToken(userId, registerRequest.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating an auth token."})
		return
	}

	animeIdList, err := services.GetIdList(userId)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "internal_server_error"})
		return
	}

	err = services.GenerateRefreshTokenCookie(userId, registerRequest.Email, context)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
		return
	}

	var userDto dtos.UserDto = dtos.UserDto{
		Id:        userId,
		Email:     registerRequest.Email,
		AuthToken: token,
		AnimeIds:  animeIdList,
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully registered.", "user": userDto})
}