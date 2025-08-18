package dtos

type UserDto struct {
	Id        string  `json:"id"`
	Email     string  `json:"email"`
	AnimeIds  []uint `json:"animeIds"`
}
