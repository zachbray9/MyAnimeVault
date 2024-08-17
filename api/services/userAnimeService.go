package services

import (
	"fmt"
	"myanimevault/database"
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