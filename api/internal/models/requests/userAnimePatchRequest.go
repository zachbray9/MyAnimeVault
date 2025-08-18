package requests

type UserAnimePatchRequest struct {
	Rating             *int    `json:"rating"`
	WatchStatus        *string `json:"watch_status"`
	NumEpisodesWatched *int    `json:"num_episodes_watched"`
}
