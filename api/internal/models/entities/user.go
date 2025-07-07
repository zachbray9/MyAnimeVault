package entities

import (
	"github.com/google/uuid"
	"time"
)

type User struct {
	Id             uuid.UUID `binding:"required"`
	Email          string    `binding:"required"`
	PasswordHash   string    `binding:"required"`
	DateRegistered time.Time `binding:"required"`
}
