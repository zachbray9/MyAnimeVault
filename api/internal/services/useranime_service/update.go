package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/entities"
	"myanimevault/internal/models/requests"

	"github.com/google/uuid"
)

func Update(userId string, animeId uint, patchRequest requests.UserAnimePatchRequest) error {
	var userAnimeDetails dtos.UserAnimeDetailsDto
	err := GetUserAnime(userId, animeId, &userAnimeDetails)

	if err != nil {
		return err
	}

	if patchRequest.Rating != nil {
		if *patchRequest.Rating < 1 || *patchRequest.Rating > 10 {
			return customErrors.ErrInvalidField
		}

		userAnimeDetails.Rating = *patchRequest.Rating
	}

	if patchRequest.WatchStatus != nil {
		allowedWatchStatuses := map[string]bool{
			"watching":      true,
			"completed":     true,
			"on hold":       true,
			"dropped":       true,
			"plan to watch": true,
		}

		validWatchStatus := allowedWatchStatuses[*patchRequest.WatchStatus]

		if !validWatchStatus {
			return customErrors.ErrInvalidField
		}
		userAnimeDetails.WatchStatus = *patchRequest.WatchStatus
	}

	if patchRequest.NumEpisodesWatched != nil {
		if *patchRequest.NumEpisodesWatched < 0 {
			return customErrors.ErrInvalidField
		}

		userAnimeDetails.NumEpisodesWatched = *patchRequest.NumEpisodesWatched
	}

	// Parse the userId string to UUID
	userUUID, err := uuid.Parse(userId)
	if err != nil {
		return fmt.Errorf("invalid user ID format: %w", err)
	}

	// Prepare update data - handle rating pointer conversion
	updateData := map[string]interface{}{
		"watch_status":         userAnimeDetails.WatchStatus,
		"num_episodes_watched": userAnimeDetails.NumEpisodesWatched,
	}

	// Handle rating conversion (int to *int)
	if userAnimeDetails.Rating == 0 {
		updateData["rating"] = nil
	} else {
		updateData["rating"] = &userAnimeDetails.Rating
	}

	// Update using GORM
	result := database.Db.Model(&entities.UserAnime{}).
		Where("user_id = ? AND anime_id = ?", userUUID, animeId).
		Updates(updateData)

	if result.Error != nil {
		return fmt.Errorf("there was a problem updating the record: %w", result.Error)
	}

	// Check if any rows were affected (record existed)
	if result.RowsAffected == 0 {
		return customErrors.ErrNotFound
	}

	return nil
}
