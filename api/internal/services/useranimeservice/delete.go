package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
)

func Delete(userId string, animeId uint) error {
	id, err := uuid.Parse(userId)
	if err != nil {
		return fmt.Errorf("invalid user id format: %w", err)
	}

	result := database.Db.Where("user_id = ? AND anime_id = ?", id, animeId).Delete(&entities.UserAnime{})

	if result.Error != nil {
		return fmt.Errorf("failed to delete useranime: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return customErrors.ErrNotFound
	}

	return nil
}
