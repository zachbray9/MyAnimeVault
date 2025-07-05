package authservice

import (
	"database/sql"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/utils"
	"strings"
)

func ValidateCredentials(email string, password string) (string, error) {
	query := `
	SELECT id, password_hash FROM users WHERE email = $1
	`
	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return "", fmt.Errorf("there was a problem preparing the db query: %w", err)
	}

	defer stmt.Close()
	row := stmt.QueryRow(strings.ToLower(email))

	var id string
	var hashedPassword string

	err = row.Scan(&id, &hashedPassword)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return "", customErrors.ErrNotFound
		default:
			return "", fmt.Errorf("an error occurred while querying the database: %w", err)
		}
	}

	passwordIsValid := utils.ComparePasswordWithHash(password, hashedPassword)
	if !passwordIsValid {
		return "", customErrors.ErrIncorrectPassword
	}

	return id, nil
}
