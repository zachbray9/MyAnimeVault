package controllers

import (
	"fmt"
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

	err = services.GetIdList(userId, &userDto.AnimeIds)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was a problem getting the users anime id list."})
		return
	}

	err = generateRefreshTokenCookie(userId, userDto.Email, context)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating a refresh token."})
		return
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

	err = services.GetIdList(userId, &userDto.AnimeIds)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was a problem getting the users anime id list."})
		return
	}

	err = generateRefreshTokenCookie(userId, userDto.Email, context)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating a refresh token."})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Successfully logged in.", "user": userDto})
}



func logout(context *gin.Context) {
	refreshToken, err := context.Cookie("refreshToken")

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Refresh token not found"})
		return
	}

	claims, err := services.VerifyRefreshToken(refreshToken)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid or expired refresh token."})
		return
	}

	userId, ok := claims["id"].(string)

	if !ok {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Invalid token claims"})
		return
	}

	tokenId, ok := claims["tokenId"].(string)

	if !ok {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Invalid token claims"})
		return
	}

	err = services.RevokeRefreshToken(userId, tokenId, refreshToken)

	if(err != nil){
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem revoking the refresh token"})
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

	userDto, err := services.GetUserById(userId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem getting the user from the database."})
		return
	}

	err = services.GetIdList(userId, &userDto.AnimeIds)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "There was a problem getting the users anime id list."})
		return
	}

	token, err := services.GenerateAuthToken(userId, userDto.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "There was a problem generating an auth token."})
		return
	}

	userDto.AuthToken = token

	context.JSON(http.StatusOK, gin.H{"message": "Current user was successfully returned.", "user": userDto})
}



func refresh(context *gin.Context) {
	refreshToken, err := context.Cookie("refreshToken")

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Refresh token not found", "error": "invalid_refresh_token"})
		return
	}

	claims, err := services.VerifyRefreshToken(refreshToken)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid or expired refresh token.", "error": "invalid_refresh_token"})
		return
	}

	userId, ok := claims["id"].(string)

	if !ok {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Invalid token claims", "error": "invalid_refresh_token"})
		return
	}

	email, ok := claims["email"].(string)

	if !ok {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Invalid token claims", "error": "invalid_refresh_token"})
		return
	}

	accessToken, err := services.GenerateAuthToken(userId, email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate access token", "error": "invalid_refresh_token"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"accessToken": accessToken})
}



func generateRefreshTokenCookie(id string, email string, context *gin.Context) error {
	expirationTime := time.Now().Add(time.Hour * 24 * 30)

	refreshToken, tokenId, err := services.GenerateRefreshToken(id, email, expirationTime.Unix())

	if err != nil {
		return fmt.Errorf("there was a problem generating a refresh token: %w", err)
	}

	err = services.StoreRefreshToken(id, tokenId, refreshToken, expirationTime)

	if err != nil {
		return fmt.Errorf("there was a problem storing the refresh token in the database: %w", err)
	}

	cookie := &http.Cookie{
		Name:     "refreshToken",
		Value:    refreshToken,
		Path:     "/",
		Expires:  expirationTime,
		HttpOnly: false,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(context.Writer, cookie)

	return nil
}
