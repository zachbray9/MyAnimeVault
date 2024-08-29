package services

import (
	"fmt"
	"myanimevault/database"
	"myanimevault/models/dtos"

	"github.com/google/uuid"
)

// "fmt"
// "myanimevault/database"
// "myanimevault/models/dtos"
// "myanimevault/models/responses"

// "github.com/google/uuid"

func AddAnimeToList(userId string, userAnime dtos.UserAnimeDto) error {
	query := `
	INSERT INTO userAnimes (id, user_id, anime_id, english_title, romaji_title, large_poster, medium_poster, format, season, season_year, watch_status, rating, num_episodes_watched, episodes)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	stmt, err := database.Db.Prepare(query)

	if(err != nil){
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
		userAnime.WatchStatus, 
		userAnime.Rating, 
		userAnime.NumEpisodesWatched, 
		userAnime.Episodes,
	)

	if(err != nil){
		return fmt.Errorf("couldn't execute query statement: %w", err)
	}

	return nil
}

func GetList(id string) ([]dtos.UserAnimeDto, error) {
	query := `
	SELECT anime_id, english_title, romaji_title, large_poster, medium_poster, format, season, season_year, watch_status, rating, num_episodes_watched, episodes 
	FROM userAnimes
	WHERE user_id = ?
	`

	stmt, err := database.Db.Prepare(query)

	if(err != nil){
		return nil, fmt.Errorf("could not prepare the database query: %w", err)
	}

	rows, err := stmt.Query(id)

	if(err != nil){
		return nil, fmt.Errorf("could not execute database query statement: %w", err)
	}

	defer rows.Close()

	var animeList []dtos.UserAnimeDto

	for(rows.Next()){
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