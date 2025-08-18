package sessionservice

import (
	"context"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
)

func DeleteByUserAndDevice(context context.Context, userId uuid.UUID, deviceId string) error {
	result := database.Db.WithContext(context).Where("user_id = ? AND device_id = ?", userId, deviceId).Delete(&entities.Session{})

	if result.Error != nil {
		return fmt.Errorf("failed to delete sessions: %w", result.Error)
	}

	return nil
}