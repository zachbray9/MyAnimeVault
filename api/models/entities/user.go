package entities

import (
	"myanimevault/database"
	"time"

	"github.com/google/uuid"
)

type User struct {
	Id             uuid.UUID `binding:"required"`
	FirstName      string    `binding:"required"`
	LastName       string    `binding:"required"`
	Email          string    `binding:"required"`
	PasswordHash   string    `binding:"required"`
	DateRegistered time.Time `binding:"required"`
}

func Create(firstName string, lastName string, email string, password string) error {
	query := `
	INSERT INTO users
	VALUES (?, ?, ?, ?, ?, ?)
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(uuid.New().String(), firstName, lastName, email, password, time.Now().UTC())

	if err != nil {
		return err
	}

	return nil
}

func (user User) Delete() error {
	query := `
	DELETE FROM users 
	WHERE id = ?
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(user.Id)

	if err != nil {
		return err
	}

	return nil
}
