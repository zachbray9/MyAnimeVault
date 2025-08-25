package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/dtos"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
)

func Create(userId string, userAnime dtos.UserAnimeDto) (entities.UserAnime, error) {
	id, err := uuid.Parse(userId)
	if err != nil {
		return entities.UserAnime{}, fmt.Errorf("invalid user id format: %w", err)
	}

	newEntry := entities.UserAnime{
		Id:           uuid.New(),
		UserId:       id,
		AnimeId:      userAnime.AnimeId,
	}

	result := database.Db.Create(&newEntry)

	if result.Error != nil {
		return entities.UserAnime{}, fmt.Errorf("couldn't create user anime: %w", result.Error)
	}

	return newEntry, nil
}
