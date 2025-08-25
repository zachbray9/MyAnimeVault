package studiorepository

import (
	"myanimevault/internal/models/entities"

	"gorm.io/gorm"
)

func Exists(tx *gorm.DB, studioId uint) (bool, error) {
	var count int64
	err := tx.Model(entities.Studio{}).Where("id = ?", studioId).Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}
