package controllers

import (
	"github.com/gin-gonic/gin"
	"myanimevault/models/requests"
	"net/http"
)

func register(context *gin.Context) {
	var registerRequest requests.RegisterRequest
	err := context.ShouldBindJSON(&registerRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was an issue with one or more of the fields in the register request."})
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

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged in."})
}
