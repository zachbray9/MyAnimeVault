package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/requests"
)

func Update(userId string, animeId int64, patchRequest requests.UserAnimePatchRequest) error {
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

	query := `
	UPDATE userAnimes
	SET rating = $1, watch_status = $2, num_episodes_watched = $3
	WHERE user_id = $4 AND anime_id = $5
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("there was a problem preparing the query statement: %w", err)
	}

	defer stmt.Close()
	_, err = stmt.Exec(userAnimeDetails.Rating, userAnimeDetails.WatchStatus, userAnimeDetails.NumEpisodesWatched, userId, animeId)

	if err != nil {
		return fmt.Errorf("there was a problem executing the query statement: %w", err)
	}

	return nil
}
