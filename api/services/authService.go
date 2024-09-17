package services

import (
	"database/sql"
	"fmt"
	"myanimevault/database"
	"myanimevault/models/customErrors"
	"myanimevault/models/dtos"
	"myanimevault/utils"
	"strings"
	"time"

	"github.com/google/uuid"
)

func Register(email string, password string) (string, error) {
	query := `
	INSERT INTO users (id, email, password_hash, date_registered)
	VALUES ($1, $2, $3, $4)
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return "", fmt.Errorf("failed to prepare db query: %w", err)
	}

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}

	defer stmt.Close()
	newId := uuid.New().String()
	_, err = stmt.Exec(newId, strings.ToLower(email), hashedPassword, time.Now().UTC())

	if err != nil {
		return "", fmt.Errorf("failed to execute statement: %w", err)
	}

	return newId, nil
}

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

func GetUserById(id string) (dtos.UserDto, error) {
	var userDto dtos.UserDto = dtos.UserDto{}

	query := `
	SELECT email FROM users WHERE id = $1
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return userDto, fmt.Errorf("an error occurred while preparing the query statement: %w", err)
	}

	row := stmt.QueryRow(id)

	var email string
	err = row.Scan(&email)

	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return userDto, customErrors.ErrNotFound
		default:
			return userDto, fmt.Errorf("an error occurred while scanning the db row: %w", err)
		}
	}

	userDto.Id = id
	userDto.Email = email
	userDto.AnimeIds = []int64{}

	return userDto, nil
}
