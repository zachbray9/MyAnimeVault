package entities

import (
	"github.com/google/uuid"
	"time"
)

type User struct {
	Id           uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Email        string    `json:"email" gorm:"unique;not null"`
	PasswordHash string    `json:"password_hash" gorm:"not null"`
	CreatedAt    time.Time `json:"created_at"`

	// Relationships
	Sessions   []Session   `json:"sessions,omitempty" gorm:"foreignKey:UserId"`
	UserAnimes []UserAnime `json:"user_animes,omitempty" gorm:"foreignKey:UserId"`
}
