package authhandler

import (
	"fmt"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/requests"
	"myanimevault/internal/services/userservice"
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

	user, err := userservice.Create(registerRequest.Email, registerRequest.Password)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was an issue registering the user."})
		return
	}

	//create session id cookie
	
	//create device id cookie

	var userDto dtos.UserDto = dtos.UserDto{
		Id:        user.Id.String(),
		Email:     user.Email,
		AnimeIds:  make([]int64, 0),
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully registered.", "user": userDto})
}