package entities

import (
	"time"

	"github.com/google/uuid"
)

type Session struct {
	Id        uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	UserId    uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
	DeviceId  string    `json:"device_id" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
	ExpiresAt time.Time `json:"expires_at"`

	//relationships
	User User `json:"user,omitempty" gorm:"foreignKey:UserId"`
}

func (session *Session) IsExpired() bool {
	return time.Now().UTC().After(session.ExpiresAt.UTC())
}
