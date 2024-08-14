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

func (user User) Delete() error {
	query := `
	DELETE FROM users 
	WHERE id = ?
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()
	_, err = stmt.Exec(user.Id)

	if err != nil {
		return err
	}

	return nil
}
