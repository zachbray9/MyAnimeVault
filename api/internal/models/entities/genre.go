package entities

type Genre struct {
	Id          uint   `json:"id" gorm:"primaryKey"`
	Name        string `json:"name" gorm:"not null;unique"`
	Description string `json:"description,omitempty"`

	// Relationships
	Animes []Anime `json:"animes,omitempty" gorm:"many2many:anime_genres;"`
}
