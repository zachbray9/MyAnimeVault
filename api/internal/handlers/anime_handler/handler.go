package animehandler

import animeservice "myanimevault/internal/services/anime_service"

type AnimeHandler struct {
	AnimeService *animeservice.AnimeService
}

func NewAnimeHandler(animeservice *animeservice.AnimeService) *AnimeHandler {
	return &AnimeHandler{
		AnimeService: animeservice,
	}
}