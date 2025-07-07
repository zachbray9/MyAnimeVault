package authservice

import (
	"context"
	"database/sql"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/entities"
	"myanimevault/internal/utils"
	"strings"
)

func ValidateCredentials(context context.Context, email string, password string) (entities.User, error) {
	query := `
	SELECT id, email, password_hash, date_registered
	FROM users
	WHERE email = $1
	`

	row := database.Db.QueryRowContext(context, query, strings.ToLower(email))

	user := entities.User{}

	err := row.Scan(&user.Id, &user.Email, &user.PasswordHash, &user.DateRegistered)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return entities.User{}, customErrors.ErrNotFound
		default:
			return entities.User{}, fmt.Errorf("an error occurred while querying the database: %w", err)
		}
	}

	passwordIsValid := utils.ComparePasswordWithHash(password, user.PasswordHash)
	if !passwordIsValid {
		return entities.User{}, customErrors.ErrIncorrectPassword
	}

	return user, nil
}
