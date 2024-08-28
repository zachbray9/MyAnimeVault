package entities

import "github.com/google/uuid"

type UserAnime struct {
	Id                 uuid.UUID
	UserId             uuid.UUID
	AnimeId            int64  `binding:"required"`
	EnglishTitle       string `binding:"required"`
	RomajiTitle        string `binding:"required"`
	LargePoster        string `binding:"required"`
	MediumPoster       string `binding:"required"`
	Format             string `binding:"required"`
	Season             string `binding:"required"`
	SeasonYear         string `binding:"required"`
	WatchStatus        string
	Rating             int64
	NumEpisodesWatched int64
	Episodes           int64 `binding:"required"`
}
