package sessionservice

import (
	"context"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"
	"time"

	"github.com/google/uuid"
)

func Create(context context.Context, userId uuid.UUID, deviceId string, duration time.Duration) (entities.Session, error) {
	expiresAt := time.Now().Add(duration)
	session := entities.Session{
		Id:        uuid.New(),
		UserId:    userId,
		DeviceId:  deviceId,
		ExpiresAt: expiresAt,
	}

	result := database.Db.Create(&session)
	if result.Error != nil {
		return entities.Session{}, fmt.Errorf("failed to create session: %w", result.Error)
	}

	return session, nil
}
