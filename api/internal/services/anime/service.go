package animeservice

import (
	"myanimevault/internal/repository/anime"
	imageservice "myanimevault/internal/services/image_service"
)

type AnimeService struct {
	animeRepo anime.AnimeRepository
	imageService *imageservice.ImageService
}

func NewAnimeService(animeRepo anime.AnimeRepository, imageService *imageservice.ImageService) *AnimeService {
	return &AnimeService{
		animeRepo: animeRepo,
		imageService: imageService,
	}
}