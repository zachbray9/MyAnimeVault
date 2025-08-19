package entities

import "time"

type Character struct {
	Id          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"`
	Description string    `json:"description,omitempty"`
	ImageUrl    string    `json:"image_url,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`

	// Relationships
	AnimeCharacters []AnimeCharacter `json:"anime_characters,omitempty" gorm:"foreignKey:CharacterId"`
}