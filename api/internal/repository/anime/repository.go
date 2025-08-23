package anime

import (
	"context"
	"myanimevault/internal/models/entities"

	"gorm.io/gorm"
)

type AnimeRepository interface {
	Create(ctx context.Context, tx *gorm.DB, anime *entities.Anime) error
}

type animeRepository struct {

}

func NewAnimeRepository() AnimeRepository{
	return &animeRepository{}
}