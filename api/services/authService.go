package services

import (
	"errors"
	"fmt"
	"myanimevault/database"
	"myanimevault/models/entities"
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

func Login(request requests.LoginRequest) error {
	query := `
	SELECT password_hash FROM users WHERE email = ?
	`

	row := database.Db.QueryRow(query, request.Email)

	var hashedPassword string
	err := row.Scan(&hashedPassword)

	if(err != nil){
		return err
	}

	passwordIsValid := utils.ComparePasswordWithHash(request.Password, hashedPassword)
	if(!passwordIsValid){
		return errors.New("invalid credentials")
	}

	return nil
}

func GetUserByEmail(email string) (*entities.User, error) {
	query := `
	SELECT * FROM users WHERE email = ?
	`
	row := database.Db.QueryRow(query, email)
	
	var user entities.User
	err := row.Scan(&user.Id, &user.FirstName, &user.LastName, &user.Email, &user.PasswordHash, &user.DateRegistered)

	if(err != nil){
		return nil, fmt.Errorf("could not scan row: %w", err)
	}

	return &user, err
}