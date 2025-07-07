package entities

import (
	"time"

	"github.com/google/uuid"
)

type Session struct {
	Id        uuid.UUID `json:"id"`
	UserId    uuid.UUID `json:"userId"`
	DeviceId  string    `json:"DeviceId"`
	CreatedAt time.Time `json:"createdAt"`
	ExpiresAt time.Time `json:"expiresAt"`
}
