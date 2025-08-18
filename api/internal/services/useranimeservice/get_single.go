package useranimeservice

import (
	"errors"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetUserAnime(userId string, animeId uint, userAnime *dtos.UserAnimeDetailsDto) error {
	userUUID, err := uuid.Parse(userId)
	if err != nil {
		return fmt.Errorf("invalid user ID format: %w", err)
	}

	var result entities.UserAnime

	err = database.Db.Select("rating, watch_status, num_episodes_watched").
		Where("user_id = ? AND anime_id = ?", userUUID, animeId).
		First(&result).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return customErrors.ErrNotFound
		}
		return fmt.Errorf("there was a problem querying the database: %w", err)
	}

	// Map the result to the DTO
	if result.Rating != nil {
		userAnime.Rating = *result.Rating
	} else {
		userAnime.Rating = 0 // or handle nil rating as needed
	}
	userAnime.WatchStatus = result.WatchStatus
	userAnime.NumEpisodesWatched = result.NumEpisodesWatched

	return nil
}
