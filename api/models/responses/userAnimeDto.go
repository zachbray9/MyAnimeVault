package responses

import "github.com/google/uuid"

type UserAnimeDto struct {
	Id                 uuid.UUID
	AnimeId            int64  `binding:"required"`
	Title              string `binding:"required"`
	EnglishTitle       string `binding:"required"`
	LargePoster        string `binding:"required"`
	MediumPoster       string `binding:"required"`
	MediaType          string `binding:"required"`
	StartSeason        string `binding:"required"`
	StartYear          int64  `binding:"required"`
	WatchStatus        string
	Rating             int64
	NumEpisodesWatched int64
	TotalEpisodes      int64 `binding:"required"`
}