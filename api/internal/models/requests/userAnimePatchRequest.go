package requests

type UserAnimePatchRequest struct {
	Rating             *int64  `json:"rating"`
	WatchStatus        *string `json:"watchStatus"`
	NumEpisodesWatched *int64  `json:"numEpisodesWatched"`
}
