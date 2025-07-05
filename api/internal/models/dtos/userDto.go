package dtos

type UserDto struct {
	Id        string  `json:"id"`
	Email     string  `json:"email"`
	AuthToken string  `json:"authToken"`
	AnimeIds  []int64 `json:"animeIds"`
}
