package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/dtos"
)

func GetUserAnime(userId string, animeId int64, userAnime *dtos.UserAnimeDetailsDto) error {
	query := `
	SELECT rating, watch_status, num_episodes_watched
	FROM userAnimes
	WHERE user_id = $1 AND anime_id = $2
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("there was a problem preparing the db query: %w", err)
	}

	defer stmt.Close()
	row := stmt.QueryRow(userId, animeId)

	var rating int64
	var watchStatus string
	var numEpisodesWatched int64

	err = row.Scan(&rating, &watchStatus, &numEpisodesWatched)

	if err != nil {
		return customErrors.ErrNotFound
	}

	userAnime.Rating = rating
	userAnime.WatchStatus = watchStatus
	userAnime.NumEpisodesWatched = numEpisodesWatched

	return nil
}
