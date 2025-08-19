package entities

import (
	"time"

	"github.com/google/uuid"
)

type AnimeCharacter struct {
	Id           uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	AnimeId      uint      `json:"anime_id" gorm:"not null"`
	CharacterId  uint      `json:"character_id" gorm:"not null"`
	VoiceActorId *uint     `json:"voice_actor_id,omitempty" gorm:"default:null"`
	Role         string    `json:"role" gorm:"not null;default:'supporting'"` // "main", "supporting", "background"
	CreatedAt    time.Time `json:"created_at"`

	// Relationships
	Anime      Anime       `json:"anime,omitempty" gorm:"foreignKey:AnimeId"`
	Character  Character   `json:"character,omitempty" gorm:"foreignKey:CharacterId"`
	VoiceActor *VoiceActor `json:"voice_actor,omitempty" gorm:"foreignKey:VoiceActorId"`

	// Composite unique key to prevent duplicate character-anime combinations
	// But allow multiple voice actors for same character (different languages)
}
