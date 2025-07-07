package userservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
	"myanimevault/internal/models/entities"
	"myanimevault/internal/utils"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

func Create(email string, password string) (entities.User, error) {
	newUser := entities.User{}

	query := `
	INSERT INTO users (id, email, password_hash, date_registered)
	VALUES ($1, $2, $3, $4)
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return newUser, fmt.Errorf("failed to prepare db query: %w", err)
	}

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return newUser, fmt.Errorf("failed to hash password: %w", err)
	}

	defer stmt.Close()
	newId := uuid.New()
	dateRegistered := time.Now().UTC()
	_, err = stmt.Exec(newId.String(), strings.ToLower(email), hashedPassword, dateRegistered)

	if err != nil {
	// check if it's a pq error
	if pqErr, ok := err.(*pq.Error); ok {
		if pqErr.Code == "23505" && pqErr.Constraint == "users_email_key" {
			return newUser, customErrors.ErrEmailAlreadyExists
		}
	}
	return newUser, fmt.Errorf("failed to execute statement: %w", err)
}

	newUser.Id = newId
	newUser.Email = email
	newUser.PasswordHash = hashedPassword
	newUser.DateRegistered = dateRegistered


	return newUser, nil
}
