package animeservice

import (
	animerepo "myanimevault/internal/repository/anime_repository"
	imageservice "myanimevault/internal/services/image_service"
)

type AnimeService struct {
	animeRepo animerepo.AnimeRepository
	imageService *imageservice.ImageService
}

func NewAnimeService(animeRepo animerepo.AnimeRepository, imageService *imageservice.ImageService) *AnimeService {
	return &AnimeService{
		animeRepo: animeRepo,
		imageService: imageService,
	}
}