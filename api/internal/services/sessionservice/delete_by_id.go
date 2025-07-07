package sessionservice

import (
	"context"
	"myanimevault/internal/database"
)

func Delete(context context.Context, sessionId string) error {
	query := `
		DELETE
		FROM sessions
		WHERE id = $1
	`
	_, err := database.Db.ExecContext(context, query, sessionId)
	return err
}