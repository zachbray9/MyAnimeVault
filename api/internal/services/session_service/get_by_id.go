package sessionservice

import (
	"context"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetById(context context.Context, sessionId string) (*entities.Session, error) {
	id, err := uuid.Parse(sessionId)
	if err != nil {
		return nil, fmt.Errorf("invalid session id format: %w", err)
	}

	session := entities.Session{}
	result := database.Db.WithContext(context).First(&session, id)

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
