package authhandler

import (
	"log"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/requests"
	"myanimevault/internal/services/sessionservice"
	"myanimevault/internal/services/userservice"
	"myanimevault/internal/utils/cookieutil"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func RegisterHandler(context *gin.Context) {
	var registerRequest requests.RegisterRequest
	err := context.ShouldBindJSON(&registerRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "bad_request", "message": "One or more input fields are invalid. Please try again."})
		return
	}

	if registerRequest.Password != registerRequest.ConfirmPassword {
		context.JSON(http.StatusBadRequest, gin.H{"error": "bad_request", "message": "Passwords do not match. Please try again."})
		return
	}

	user, err := userservice.Create(registerRequest.Email, registerRequest.Password)

	if err != nil {
		log.Printf("userservice.Create: failed to add the new user to the database: %v", err)

		switch err {
		case customErrors.ErrEmailAlreadyExists:
			context.JSON(http.StatusConflict, gin.H{"error": "email_exists", "message": "An account with this email already exists."})
		default:
			context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error", "message": "Something went wrong. Please try again."})
		}
		
		return
	}

	//create new device id
	deviceId := uuid.NewString()

	//create session
	session, err := sessionservice.Create(context.Request.Context(), user.Id, deviceId, 24 * time.Hour * 30)
	if err != nil {
		log.Printf("sessionService.Create: failed to create a session for user %s: %v", user.Id, err)
		context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error", "message": "Something went wrong. Please try again later."})
		return
	}

	//create session id cookie
	sessionIdCookie := cookieutil.CreateSessionCookie(session.Id.String())
	
	//create device id cookie
	deviceIdCookie := cookieutil.CreateDeviceCookie(deviceId)

	userDto := dtos.UserDto{
		Id:        user.Id.String(),
		Email:     user.Email,
		AnimeIds:  make([]int64, 0),
	}

	//add cookies to response
	http.SetCookie(context.Writer, sessionIdCookie)
	http.SetCookie(context.Writer, deviceIdCookie)

	context.JSON(http.StatusOK, gin.H{"message": "Successfully registered.", "user": userDto})
}