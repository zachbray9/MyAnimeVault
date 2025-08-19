package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
)

func GetIdList(userId string) ([]uint, error) {
	animeIdList := []uint{}

	id, err := uuid.Parse(userId)
	if err != nil {
		return animeIdList, fmt.Errorf("invalid user id format: %w", err)
	}

	err = database.Db.Model(entities.UserAnime{}).Select("anime_id").Where("user_id = ?", id).Find(&animeIdList).Error //will change to anime_id once database has data

	if err != nil {
		return animeIdList, fmt.Errorf("an error occurred while querying anime ids: %w", err)
	}

	return animeIdList, nil
}
