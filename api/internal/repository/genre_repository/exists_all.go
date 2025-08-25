package genrerepository

import (
	"myanimevault/internal/models/entities"

	"gorm.io/gorm"
)

func ExistsAll(tx *gorm.DB, genreIds []uint) (bool, error) {
	var count int64
	err := tx.Model(entities.Genre{}).Where("id IN ?", genreIds).Count(&count).Error

	if err != nil {
		return false, err
	}

	return count == int64(len(genreIds)), nil
}