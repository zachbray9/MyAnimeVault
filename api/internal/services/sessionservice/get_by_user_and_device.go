package sessionservice

import (
	"context"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetByUserAndDevice(context context.Context, userId uuid.UUID, deviceId string) (*entities.Session, error) {
	session := entities.Session{}

	result := database.Db.WithContext(context).Where("user_id = ? AND device_id = ?", userId, deviceId).First(&session)

	if result.Error != nil {
		switch result.Error {
		case gorm.ErrRecordNotFound:
			return nil, nil
		default:
			return nil, fmt.Errorf("failed to get session: %w", result.Error)
		}
	}

	return &session, nil
}
