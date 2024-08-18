package services

import (
	"fmt"
	"myanimevault/database"
	"myanimevault/models/responses"
	"myanimevault/models/entities"

	"github.com/google/uuid"
)

func CreateUserAnime(userAnime entities.UserAnime) error {
	query := `
	INSERT INTO userAnimes (id, user_id, anime_id, title, title_en, large_poster, medium_poster, media_type, start_season, start_year, watch_status, rating, num_episodes_watched, total_episodes)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	stmt, err := database.Db.Prepare(query)

	if(err != nil){
		return fmt.Errorf("couldn't prepare query: %w", err)
	}

	defer stmt.Close()

	_, err = stmt.Exec(
		uuid.New(), 
		userAnime.UserId, 
		userAnime.AnimeId, 
		userAnime.Title, 
		userAnime.EnglishTitle, 
		userAnime.LargePoster, 
		userAnime.MediumPoster, 
		userAnime.MediaType, 
		userAnime.StartSeason, 
		userAnime.StartYear, 
		userAnime.WatchStatus, 
		userAnime.Rating, 
		userAnime.NumEpisodesWatched, 
		userAnime.TotalEpisodes,
	)

	if(err != nil){
		return fmt.Errorf("couldn't execute query statement: %w", err)
	}

	return nil
}

func GetList(id string) ([]responses.UserAnimeDto, error) {
	query := `
	SELECT id, anime_id, title, title_en, large_poster, medium_poster, media_type, start_season, start_year, watch_status, rating, num_episodes_watched, total_episodes 
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

	var animeList []responses.UserAnimeDto

	for(rows.Next()){
		var userAnime responses.UserAnimeDto
		rows.Scan(
			&userAnime.Id, 
			&userAnime.AnimeId, 
			&userAnime.Title, 
			&userAnime.EnglishTitle, 
			&userAnime.LargePoster, 
			&userAnime.MediumPoster, 
			&userAnime.MediaType, 
			&userAnime.StartSeason, 
			&userAnime.StartYear, 
			&userAnime.WatchStatus, 
			&userAnime.Rating, 
			&userAnime.NumEpisodesWatched, 
			&userAnime.TotalEpisodes,
		)

		animeList = append(animeList, userAnime)
	}

	return animeList, nil
}