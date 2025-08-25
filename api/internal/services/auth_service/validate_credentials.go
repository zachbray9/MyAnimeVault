package authservice

import (
	"context"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/entities"
	"myanimevault/internal/utils"
	"strings"

	"gorm.io/gorm"
)

func ValidateCredentials(context context.Context, email string, password string) (entities.User, error) {
	user := entities.User{}

	result := database.Db.WithContext(context).Where("email = ?", strings.ToLower(email)).First(&user)

	if result.Error != nil {
		switch result.Error {
		case gorm.ErrRecordNotFound:
			return entities.User{}, customErrors.ErrNotFound
		default:
			return entities.User{}, fmt.Errorf("an error occurred while querying the database: %w", result.Error)
		}
	}

	passwordIsValid := utils.ComparePasswordWithHash(password, user.PasswordHash)
	if !passwordIsValid {
		return entities.User{}, customErrors.ErrIncorrectPassword
	}

	return user, nil
}
