package sessionservice

import (
	"context"
	"database/sql"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
)

func GetByUserAndDevice(context context.Context, userId uuid.UUID, deviceId string) (*entities.Session, error) {
	query := `
		SELECT id, user_id, device_id, created_at, expires_at
		FROM sessions
		WHERE user_id = $1 AND device_id = $2
		LIMIT 1
	`

	row := database.Db.QueryRowContext(context, query, userId, deviceId)

	session := entities.Session{}
	err := row.Scan(&session.Id, &session.UserId, &session.DeviceId, &session.CreatedAt, &session.ExpiresAt)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	return &session, nil
}