package services

import (
	"fmt"
	"myanimevault/database"
	"myanimevault/models/dtos"

	"github.com/google/uuid"
)

func AddAnimeToList(userId string, userAnime dtos.UserAnimeDto) error {
	query := `
	INSERT INTO userAnimes (id, user_id, anime_id, english_title, romaji_title, large_poster, medium_poster, format, season, season_year, episodes, watch_status, rating, num_episodes_watched)
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
		userAnime.Episodes,
		"Plan to Watch", 
		0, 
		0, 
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

	defer stmt.Close()
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

func GetIdList (userId string, animeIdList *[]int64) error {
	query := `
	SELECT anime_id
	FROM userAnimes
	WHERE user_id = ?
	`

	stmt, err := database.Db.Prepare(query)

	if(err != nil){
		return fmt.Errorf("there was a problem preparing the query: %w", err)
	}

	defer stmt.Close()
	rows, err := stmt.Query(userId)

	if(err != nil){
		return fmt.Errorf("there was a problem executing the query statement: %w", err)
	}

	for(rows.Next()){
		var id int64
		err = rows.Scan(&id)
		if(err != nil){
			return fmt.Errorf("there was a problem scanning the db rows: %w", err)
		}

		*animeIdList = append(*animeIdList, id)
	}

	return nil
}

func GetUserAnimeDetails (userId string, animeId int64, userAnime *dtos.UserAnimeDetailsDto) error {
	query := `
	SELECT rating, watch_status, num_episodes_watched
	FROM userAnimes
	WHERE user_id = ? AND anime_id = ?
	`

	stmt, err := database.Db.Prepare(query)

	if(err != nil){
		return fmt.Errorf("there was a problem preparing the db query: %w", err)
	}

	defer stmt.Close()
	row := stmt.QueryRow(userId, animeId)

	var rating int64
	var watchStatus string
	var numEpisodesWatched int64

	err = row.Scan(&rating, &watchStatus, &numEpisodesWatched)

	if(err != nil){
		return fmt.Errorf("there was a problem scanning the db row: %w", err)
	}

	userAnime.Rating = rating
	userAnime.WatchStatus = watchStatus
	userAnime.NumEpisodesWatched = numEpisodesWatched

	return nil
}