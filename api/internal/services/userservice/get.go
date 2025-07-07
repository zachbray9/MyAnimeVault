package userservice

import (
	"database/sql"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/entities"
	"time"

	"github.com/google/uuid"
)

func Get(id string) (entities.User, error) {
	user := entities.User{}

	query := `
	SELECT id, email, passwordHash, date_registered FROM users WHERE id = $1
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return user, fmt.Errorf("an error occurred while preparing the query statement: %w", err)
	}

	row := stmt.QueryRow(id)

	var uuid uuid.UUID
	var email string
	var passwordHash string
	var dateRegistered time.Time
	err = row.Scan(&uuid, &email, &passwordHash, &dateRegistered)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return user, customErrors.ErrNotFound
		default:
			return user, fmt.Errorf("an error occurred while scanning the db row: %w", err)
		}
	}

	user.Id = uuid
	user.Email = email
	user.PasswordHash = passwordHash
	user.DateRegistered = dateRegistered

	return user, nil
}