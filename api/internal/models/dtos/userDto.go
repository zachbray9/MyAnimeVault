package dtos

type UserDto struct {
	Id        string  `json:"id"`
	Email     string  `json:"email"`
	AnimeIds  []int64 `json:"animeIds"`
}
