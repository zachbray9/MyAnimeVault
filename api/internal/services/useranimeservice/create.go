package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/entities"
	"strconv"

	"github.com/google/uuid"
)

func Create(userId string, userAnime dtos.UserAnimeDto) (entities.UserAnime, error) {
	newUserAnime := entities.UserAnime{}

	query := `
	INSERT INTO userAnimes (id, user_id, anime_id, english_title, romaji_title, large_poster, medium_poster, format, season, season_year, episodes, watch_status, rating, num_episodes_watched)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return newUserAnime, fmt.Errorf("couldn't prepare query: %w", err)
	}

	defer stmt.Close()

	newId := uuid.New()

	newUserAnime.Id = newId
	newUserAnime.UserId, err = uuid.Parse(userId)
	if err != nil {
		newUserAnime = entities.UserAnime{}
		return newUserAnime, fmt.Errorf("couldn't parse user id: %v", err)
	}
	newUserAnime.AnimeId = userAnime.AnimeId
	newUserAnime.EnglishTitle = userAnime.Title.English
	newUserAnime.RomajiTitle = userAnime.Title.Romaji
	newUserAnime.LargePoster  = userAnime.CoverImage.Large
	newUserAnime.MediumPoster = userAnime.CoverImage.Medium
	newUserAnime.Format = userAnime.Format
	newUserAnime.Season = userAnime.Season
	newUserAnime.SeasonYear = strconv.FormatInt(userAnime.SeasonYear, 10)
	newUserAnime.Episodes = userAnime.Episodes
	newUserAnime.WatchStatus = "watching"
	newUserAnime.Rating = 5
	newUserAnime.NumEpisodesWatched = 0

	_, err = stmt.Exec(
		newUserAnime.Id,
		newUserAnime.UserId,
		newUserAnime.AnimeId,
		newUserAnime.EnglishTitle,
		newUserAnime.RomajiTitle,
		newUserAnime.LargePoster,
		newUserAnime.MediumPoster,
		newUserAnime.Format,
		newUserAnime.Season,
		newUserAnime.SeasonYear,
		newUserAnime.Episodes,
		newUserAnime.WatchStatus,
		newUserAnime.Rating,
		newUserAnime.NumEpisodesWatched,
	)

	if err != nil {
		newUserAnime = entities.UserAnime{}
		return newUserAnime, fmt.Errorf("couldn't execute query statement: %w", err)
	}

	return newUserAnime, nil
}
