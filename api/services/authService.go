package services

import (
	"fmt"
	"myanimevault/database"
	"myanimevault/models/dtos"
	"myanimevault/utils"
	"time"

	"github.com/google/uuid"
)

func Register(email string, password string) (string, error) {
	query := `
	INSERT INTO users (id, email, password_hash, date_registered)
	VALUES (?, ?, ?, ?)
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
	_, err = stmt.Exec(newId, email, hashedPassword, time.Now().UTC())

	if err != nil {
		return "", fmt.Errorf("failed to execute statement: %w", err)
	}

	return newId, nil
}

func ValidateCredentials(email string, password string) (string, error) {
	query := `
	SELECT id, password_hash FROM users WHERE email = ?
	`

	row := database.Db.QueryRow(query, email)

	var id string
	var hashedPassword string
	err := row.Scan(&id, &hashedPassword)

	if err != nil {
		return "", err
	}

	passwordIsValid := utils.ComparePasswordWithHash(password, hashedPassword)
	if !passwordIsValid {
		return "", fmt.Errorf("invalid credentials")
	}

	return id, nil
}

func GetUserById(id string) (dtos.UserDto, error){
	query := `
	SELECT email FROM users WHERE id = ? 
	`

	stmt, err := database.Db.Prepare(query)

	if(err != nil){
		return dtos.UserDto{}, fmt.Errorf("couldn't prepare query statement: %w", err)
	}

	row := stmt.QueryRow(id)

	var email string
	err = row.Scan(&email)

	if(err != nil){
		return dtos.UserDto{}, fmt.Errorf("row.scan failed: %w", err)
	}

	var user dtos.UserDto = dtos.UserDto{
		Id: id,
		Email: email,
	}

	return user, nil
}
