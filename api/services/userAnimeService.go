package services

import (
	"fmt"
	"myanimevault/database"
	"myanimevault/models/customErrors"
	"myanimevault/models/dtos"
	"myanimevault/models/requests"

	"github.com/google/uuid"
)

func AddAnimeToList(userId string, userAnime dtos.UserAnimeDto) error {
	query := `
	INSERT INTO userAnimes (id, user_id, anime_id, english_title, romaji_title, large_poster, medium_poster, format, season, season_year, episodes, watch_status, rating, num_episodes_watched)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("couldn't prepare query: %w", err)
	}

	defer stmt.Close()

	_, err = stmt.Exec(
		uuid.New(),
		userId,
		userAnime.AnimeId,
		userAnime.Title.English,
		userAnime.Title.Romaji,
		userAnime.CoverImage.Large,
		userAnime.CoverImage.Medium,
		userAnime.Format,
		userAnime.Season,
		userAnime.SeasonYear,
		userAnime.Episodes,
		"watching",
		5,
		0,
	)

	if err != nil {
		return fmt.Errorf("couldn't execute query statement: %w", err)
	}

	return nil
}

func GetList(id string) ([]dtos.UserAnimeDto, error) {
	query := `
	SELECT anime_id, english_title, romaji_title, large_poster, medium_poster, format, season, season_year, watch_status, rating, num_episodes_watched, episodes 
	FROM userAnimes
	WHERE user_id = $1
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return nil, fmt.Errorf("could not prepare the database query: %w", err)
	}

	defer stmt.Close()
	rows, err := stmt.Query(id)

	if err != nil {
		return nil, fmt.Errorf("could not execute database query statement: %w", err)
	}

	defer rows.Close()

	var animeList []dtos.UserAnimeDto

	for rows.Next() {
		var userAnime dtos.UserAnimeDto
		rows.Scan(
			&userAnime.AnimeId,
			&userAnime.Title.English,
			&userAnime.Title.Romaji,
			&userAnime.CoverImage.Large,
			&userAnime.CoverImage.Medium,
			&userAnime.Format,
			&userAnime.Season,
			&userAnime.SeasonYear,
			&userAnime.WatchStatus,
			&userAnime.Rating,
			&userAnime.NumEpisodesWatched,
			&userAnime.Episodes,
		)

		animeList = append(animeList, userAnime)
	}

	return animeList, nil
}

func GetIdList(userId string) ([]int64, error) {
	var animeIdList []int64 = []int64{}

	query := `
	SELECT anime_id
	FROM userAnimes
	WHERE user_id = $1
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return animeIdList, fmt.Errorf("an error occurred while preparing the query: %w", err)
	}

	defer stmt.Close()
	rows, err := stmt.Query(userId)

	if err != nil {
			return animeIdList, fmt.Errorf("an error occurred while executing the query statement: %w", err)
		}

	for rows.Next() {
		var id int64
		err = rows.Scan(&id)
		if err != nil {
			return animeIdList, fmt.Errorf("an error occurred while scanning the db rows: %w", err)
		}

		animeIdList = append(animeIdList, id)
	}

	return animeIdList, nil
}

func GetUserAnimeDetails(userId string, animeId int64, userAnime *dtos.UserAnimeDetailsDto) error {
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

func UpdateUserAnime(userId string, animeId int64, patchRequest requests.UserAnimePatchRequest) error {
	var userAnimeDetails dtos.UserAnimeDetailsDto
	err := GetUserAnimeDetails(userId, animeId, &userAnimeDetails)

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

func DeleteUserAnime(userId string, animeId int64) error {
	query := `
	DELETE 
	FROM userAnimes 
	WHERE user_id = $1 AND anime_id = $2
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("there was a problem preparing the delete query: %w", err)
	}

	defer stmt.Close()
	result, err := stmt.Exec(userId, animeId)

	if err != nil {
		return fmt.Errorf("there was a problem executing the delete query: %w", err)
	}

	numRows, err := result.RowsAffected()

	if err != nil {
		return fmt.Errorf("there was a problem with executing RowsAffected: %w", err)
	}

	if numRows < 1 {
		return customErrors.ErrNotFound
	}

	return nil
}
