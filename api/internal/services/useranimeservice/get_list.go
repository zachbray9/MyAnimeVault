package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
)

func GetList(userId string) ([]dtos.UserAnimeDto, error) {
	var userAnimes []entities.UserAnime
	var animeList []dtos.UserAnimeDto

	// Parse the userId string to UUID
	userUUID, err := uuid.Parse(userId)
	if err != nil {
		return nil, fmt.Errorf("invalid user ID format: %w", err)
	}

	// Query using GORM to get user anime records
	err = database.Db.Select("anime_id, english_title, romaji_title, large_poster, medium_poster, format, season, season_year, watch_status, rating, num_episodes_watched, episodes").
		Where("user_id = ?", userUUID).
		Find(&userAnimes).Error

	if err != nil {
		return nil, fmt.Errorf("could not execute database query: %w", err)
	}

	// Convert to DTOs
	animeList = make([]dtos.UserAnimeDto, 0, len(userAnimes))
	for _, userAnime := range userAnimes {
		dto := dtos.UserAnimeDto{
			AnimeId:            userAnime.AnimeId,
			WatchStatus:        userAnime.WatchStatus,
			Rating:             *userAnime.Rating,
			NumEpisodesWatched: userAnime.NumEpisodesWatched,
		}

		animeList = append(animeList, dto)
	}

	return animeList, nil
}
