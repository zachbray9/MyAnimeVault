package sessionservice

import (
	"context"
	"myanimevault/internal/database"

	"github.com/google/uuid"
)

func DeleteByUserAndDevice(context context.Context, userId uuid.UUID, deviceId string) error {
	query := `
		DELETE
		FROM sessions
		WHERE user_id = $1 AND device_id = $2
	`

	_, err := database.Db.ExecContext(context, query, userId, deviceId)

	return err
}