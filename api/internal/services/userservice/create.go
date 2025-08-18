package userservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"
	"myanimevault/internal/utils"
	"strings"
)

func Create(email string, password string) (entities.User, error) {
	var newUser entities.User

	// Hash the password
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return newUser, fmt.Errorf("failed to hash password: %w", err)
	}

	// Create the user entity
	newUser = entities.User{
		Email:        strings.ToLower(email),
		PasswordHash: hashedPassword,
	}

	// Create using GORM
	err = database.Db.Create(&newUser).Error

	if err != nil {
		return entities.User{}, fmt.Errorf("failed to create user: %w", err)
	}

	return newUser, nil
}
