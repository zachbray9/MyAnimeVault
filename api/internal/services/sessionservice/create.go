package sessionservice

import (
	"context"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"
	"time"

	"github.com/google/uuid"
)

func Create(context context.Context, userId uuid.UUID, deviceId string, duration time.Duration) (entities.Session, error) {
	sessionId := uuid.New()
	expiresAt := time.Now().Add(duration)

	query := `
		INSERT INTO sessions (id, user_id, device_id, created_at, expires_at)
		VALUES ($1, $2, $3, NOW(), $4)
		RETURNING id, user_id, devide_id, created_at, expires_at;
	`

	session := entities.Session{}
	err := database.Db.QueryRowContext(context, query, sessionId, userId, deviceId, expiresAt,
		).Scan(&session.Id, &session.UserId, &session.DeviceId, &session.CreatedAt, &session.ExpiresAt)

	if err != nil {
		return entities.Session{}, err
	}

	return session, nil
}