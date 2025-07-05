package authhandler

import (
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/requests"
	"myanimevault/internal/services"
	"myanimevault/internal/services/authservice"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginHandler(context *gin.Context) {
	var loginRequest requests.LoginRequest
	err := context.ShouldBindJSON(&loginRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_field"})
		return
	}

	userId, err := authservice.ValidateCredentials(loginRequest.Email, loginRequest.Password)

	if err != nil {
		switch err {
		case customErrors.ErrNotFound:
			context.JSON(http.StatusNotFound, gin.H{"error": "email_not_found"})
			return
		case customErrors.ErrIncorrectPassword:
			context.JSON(http.StatusUnauthorized, gin.H{"error": "incorrect_password"})
			return
		default:
			context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
		}
	}

	token, err := services.GenerateAuthToken(userId, loginRequest.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
		return
	}

	animeIdList, err := services.GetIdList(userId)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "internal_server_error"})
		return
	}

	var userDto dtos.UserDto = dtos.UserDto{
		Id:        userId,
		Email:     loginRequest.Email,
		AuthToken: token,
		AnimeIds:  animeIdList,
	}

	err = services.GenerateRefreshTokenCookie(userId, userDto.Email, context)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "internal_server_error"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged in.", "user": userDto})
}
