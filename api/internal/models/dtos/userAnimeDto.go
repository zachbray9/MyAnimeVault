package dtos

type UserAnimeDto struct {
	AnimeId            uint       `json:"id" binding:"required"`
	AniListId          uint       `json:"anilist_id,omitempty"`
	Title              Title      `json:"title" binding:"required"`
	CoverImage         CoverImage `json:"coverImage" binding:"required"`
	Format             string     `json:"format" binding:"required"`
	Season             string     `json:"season" binding:"required"`
	SeasonYear         int        `json:"seasonYear" binding:"required"`
	Episodes           int        `json:"episodes"`
	WatchStatus        string     `json:"watchStatus"`
	Rating             int        `json:"rating"`
	NumEpisodesWatched int        `json:"numEpisodesWatched"`
}
