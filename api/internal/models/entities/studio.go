package entities

import "time"

type Studio struct {
	Id        uint       `json:"id" gorm:"primaryKey"`
	Name      string     `json:"name" gorm:"not null;unique"`
	Founded   *time.Time `json:"founded,omitempty"`
	Website   string     `json:"website,omitempty"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`

	// Relationships
	Animes []Anime `json:"animes,omitempty" gorm:"foreignKey:StudioId"`
}