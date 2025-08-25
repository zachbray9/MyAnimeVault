package userservice

import (
	"context"
	"errors"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func Get(context context.Context, id uuid.UUID) (entities.User, error) {
	var user entities.User

	// Query using GORM to get user by ID
	err := database.Db.WithContext(context).
		Select("id, email, password_hash, created_at").
		Where("id = ?", id).
		First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return user, customErrors.ErrNotFound
		}
		return user, fmt.Errorf("an error occurred while querying the user: %w", err)
	}

	return user, nil
}
