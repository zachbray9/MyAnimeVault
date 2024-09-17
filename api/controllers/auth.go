package controllers

import (
	"fmt"
	"myanimevault/models/customErrors"
	"myanimevault/models/dtos"
	"myanimevault/models/requests"
	"myanimevault/services"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func register(context *gin.Context) {
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
		AnimeIds: animeIdList,
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully registered.", "user": userDto})
}



func login(context *gin.Context) {
	var loginRequest requests.LoginRequest
	err := context.ShouldBindJSON(&loginRequest)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_field"})
		return
	}

	userId, err := services.ValidateCredentials(loginRequest.Email, loginRequest.Password)

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
		AnimeIds: animeIdList,
	}

	err = services.GenerateRefreshTokenCookie(userId, userDto.Email, context)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "internal_server_error"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged in.", "user": userDto})
}



func logout(context *gin.Context) {
	userId := context.GetString("userId")
	
	refreshToken, err := context.Cookie("refreshToken")

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "refresh_token_not_found"})
	}
	
	err = services.RevokeRefreshToken(userId, refreshToken)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"error": "internal_server_error"})
		return
	}

	cookie := &http.Cookie{
		Name:     "refreshToken",
		Value:    "",
		Path:     "/",
		Expires:  time.Now(),
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(context.Writer, cookie)

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged out."})
}



func getCurrentUser(context *gin.Context) {
	userId := context.GetString("userId")
	userEmail := context.GetString("userEmail")

	userDto, err := services.GetUserById(userId)

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

	animeIdList, err := services.GetIdList(userId)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was a problem getting the users anime id list."})
		return
	}

	token, err := services.GenerateAuthToken(userId, userDto.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating an auth token."})
		return
	}

	userDto.Id = userId
	userDto.Email = userEmail
	userDto.AuthToken = token
	userDto.AnimeIds = animeIdList

	context.JSON(http.StatusOK, gin.H{"message": "Current user was successfully returned.", "user": userDto})
}



func refresh(context *gin.Context) {
	refreshToken, err := context.Cookie("refreshToken")

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Refresh token not found", "error": "invalid_refresh_token"})
		return
	}

	claims, err := services.VerifyAuthToken(refreshToken)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "invalid_refresh_token"})
		return
	}

	userId, ok := claims["id"].(string)
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "invalid_refresh_token"})
		return
	}

	tokenId, ok := claims["tokenId"].(string)
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "invalid_refresh_token"})
	}

	email, ok := claims["email"].(string)
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "invalid_refresh_token"})
		return
	}

	err = services.ValidateRefreshToken(userId, tokenId, refreshToken)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "invalid_refresh_token"})
		return
	}

	accessToken, err := services.GenerateAuthToken(userId, email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate access token", "error": "invalid_refresh_token"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"accessToken": accessToken})
}
