package controllers

import (
	"fmt"
	"myanimevault/models/requests"
	"myanimevault/models/dtos"
	"myanimevault/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func register(context *gin.Context) {
	var registerRequest requests.RegisterRequest
	err := context.ShouldBindJSON(&registerRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was an issue with one or more of the fields in the register request."})
		return
	}

	if registerRequest.Password != registerRequest.ConfirmPassword {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Passwords do not match."})
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

	var userDto dtos.UserDto = dtos.UserDto{
		Id:        userId,
		Email:     registerRequest.Email,
		AuthToken: token,
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully registered.", "user": userDto})
}

func login(context *gin.Context) {
	var loginRequest requests.LoginRequest
	err := context.ShouldBindJSON(&loginRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was an issue with one or more of the fields in the login request."})
		return
	}

	userId, err := services.ValidateCredentials(loginRequest.Email, loginRequest.Password)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials."})
		return
	}

	token, err := services.GenerateAuthToken(userId, loginRequest.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating an auth token."})
		return
	}

	var userDto dtos.UserDto = dtos.UserDto{
		Id:        userId,
		Email:     loginRequest.Email,
		AuthToken: token,
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged in.", "user": userDto})
}

func getCurrentUser(context *gin.Context) {
	userId := context.GetString("userId")

	userDto, err := services.GetUserById(userId)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem getting the user from the database."})
	}

	token, err := services.GenerateAuthToken(userId, userDto.Email)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating an auth token."})
	}

	userDto.AuthToken = token

	context.JSON(http.StatusOK, gin.H{"message": "Current user was successfully returned.", "user": userDto})
}
