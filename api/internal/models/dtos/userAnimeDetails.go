package dtos

type UserAnimeDetailsDto struct {
	Rating             int64  `json:"rating"`
	WatchStatus        string `json:"watchStatus"`
	NumEpisodesWatched int64  `json:"numEpisodesWatched"`
}
