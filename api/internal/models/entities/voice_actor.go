package entities

import "time"

type VoiceActor struct {
	Id        uint       `json:"id" gorm:"primaryKey"`
	Name      string     `json:"name" gorm:"not null"`
	Language  string     `json:"language" gorm:"not null"` // e.g., "Japanese", "English"
	ImageUrl  string     `json:"image_url,omitempty"`
	BirthDate *time.Time `json:"birth_date,omitempty"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`

	// Relationships
	AnimeCharacters []AnimeCharacter `json:"anime_characters,omitempty" gorm:"foreignKey:VoiceActorId"`
}
