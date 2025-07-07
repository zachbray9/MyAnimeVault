package sessionservice

import (
	"context"
	"database/sql"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"
)

func GetById(context context.Context, sessionId string) (*entities.Session, error) {
	query := `
		SELECT id, user_id, device_id, created_at, expires_at
		FROM sessions
		WHERE id = $1
		LIMIT 1
	`

	row := database.Db.QueryRowContext(context, query, sessionId)

	session := entities.Session{}
	err := row.Scan(&session.Id, &session.UserId, &session.DeviceId, &session.CreatedAt, &session.ExpiresAt)

	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	return &session, nil
}