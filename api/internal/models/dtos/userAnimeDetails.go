package dtos

type UserAnimeDetailsDto struct {
	Rating             int  `json:"rating"`
	WatchStatus        string `json:"watchStatus"`
	NumEpisodesWatched int  `json:"numEpisodesWatched"`
}
