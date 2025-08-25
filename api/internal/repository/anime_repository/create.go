package animerepository

import (
	"context"
	"fmt"
	"myanimevault/internal/models/entities"

	"gorm.io/gorm"
)

func (r *animeRepository) Create(ctx context.Context, tx *gorm.DB, anime *entities.Anime) (error) {
	err := tx.Create(anime).Error

	if err != nil {
		return fmt.Errorf("there was a problem creating the anime: %w", err)
	}

	return nil
}