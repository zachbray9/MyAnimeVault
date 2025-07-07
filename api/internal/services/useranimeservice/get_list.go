package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/dtos"
)

func GetList(userId string) ([]dtos.UserAnimeDto, error) {
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
	rows, err := stmt.Query(userId)

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