package controllers

import (
	"fmt"
	"myanimevault/models/requests"
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

	err = services.Register(registerRequest)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was an issue registering the user."})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully registered."})
}

func login(context *gin.Context) {
	var loginRequest requests.LoginRequest
	err := context.ShouldBindJSON(&loginRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was an issue with one or more of the fields in the login request."})
		return
	}

	userId, err := services.ValidateCredentials(loginRequest)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials."})
		return
	}

	token, err := services.GenerateAuthToken(userId, loginRequest.Email)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating an auth token."})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged in.", "authToken": token})
}

func GetUserByEmail(context *gin.Context) {
	email := context.Param("email")

	user, err := services.GetUserByEmail(email)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Something went wrong."})
		return
	}

	context.JSON(http.StatusOK, user)
}
