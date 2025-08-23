package animeservice

import (
	"myanimevault/internal/repository/anime"
	"myanimevault/internal/services/image"
)

type AnimeService struct {
	animeRepo anime.AnimeRepository
	imageService *image.ImageService
}

func NewAnimeService(animeRepo anime.AnimeRepository, imageService *image.ImageService) *AnimeService {
	return &AnimeService{
		animeRepo: animeRepo,
		imageService: imageService,
	}
}