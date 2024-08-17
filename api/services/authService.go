package services

import (
	"errors"
	"fmt"
	"myanimevault/database"
	"myanimevault/models/requests"
	"myanimevault/utils"
	"time"

	"github.com/google/uuid"
)

func Register (request requests.RegisterRequest) error{
	query := `
	INSERT INTO users (id, first_name, last_name, email, password_hash, date_registered)
	VALUES (?, ?, ?, ?, ?, ?)
	`

	stmt, err := database.Db.Prepare(query)

	if(err != nil){
		return fmt.Errorf("failed to prepare db query: %w", err)
	}

	hashedPassword, err := utils.HashPassword(request.Password)
	if(err != nil){
		return fmt.Errorf("failed to hash password: %w", err)
	}

	defer stmt.Close()
	_, err = stmt.Exec(uuid.New().String(), request.FirstName, request.LastName, request.Email, hashedPassword, time.Now().UTC())

	if(err != nil){
		return fmt.Errorf("failed to execute statement: %w", err)
	}

	return nil
}

func ValidateCredentials(request requests.LoginRequest) (string, error) {
	query := `
	SELECT id, password_hash FROM users WHERE email = ?
	`

	row := database.Db.QueryRow(query, request.Email)

	var id string
	var hashedPassword string
	err := row.Scan(&id, &hashedPassword)

	if(err != nil){
		return "", err
	}

	passwordIsValid := utils.ComparePasswordWithHash(request.Password, hashedPassword)
	if(!passwordIsValid){
		return "", errors.New("invalid credentials")
	}

	return id, nil
}