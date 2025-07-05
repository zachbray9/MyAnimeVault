package dtos

type UserAnimeDto struct {
	AnimeId            int64      `json:"id" binding:"required"`
	Title              Title      `json:"title" binding:"required"`
	CoverImage         CoverImage `json:"coverImage" binding:"required"`
	Format             string     `json:"format" binding:"required"`
	Season             string     `json:"season" binding:"required"`
	SeasonYear         int64      `json:"seasonYear" binding:"required"`
	Episodes           int64      `json:"episodes"`
	WatchStatus        string     `json:"watchStatus"`
	Rating             int64      `json:"rating"`
	NumEpisodesWatched int64      `json:"numEpisodesWatched"`
}
