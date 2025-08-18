package sessionservice

import (
	"context"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
)

func Delete(context context.Context, sessionId string) error {
	id, err := uuid.Parse(sessionId)

	if err != nil {
		return fmt.Errorf("invalid session id format: %w", err)
	}

	result := database.Db.WithContext(context).Delete(&entities.Session{}, id)

	if result.Error != nil {
		return fmt.Errorf("failed to delete session: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("session not found")
	}

	return nil
}
