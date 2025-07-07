package userservice

import (
	"context"
	"database/sql"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/entities"

	"github.com/google/uuid"
)

func Get(context context.Context, id uuid.UUID) (entities.User, error) {
	user := entities.User{}

	query := `
		SELECT id, email, password_hash, date_registered
		FROM users
		WHERE id = $1
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return user, fmt.Errorf("an error occurred while preparing the query statement: %w", err)
	}

	row := stmt.QueryRow(id)

	err = row.Scan(&user.Id, &user.Email, &user.PasswordHash, &user.DateRegistered)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return user, customErrors.ErrNotFound
		default:
			return user, fmt.Errorf("an error occurred while scanning the db row: %w", err)
		}
	}

	return user, nil
}
