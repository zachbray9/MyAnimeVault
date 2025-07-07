package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/customErrors"
)

func Delete(userId string, animeId int64) error {
	query := `
	DELETE 
	FROM userAnimes 
	WHERE user_id = $1 AND anime_id = $2
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return fmt.Errorf("there was a problem preparing the delete query: %w", err)
	}

	defer stmt.Close()
	result, err := stmt.Exec(userId, animeId)

	if err != nil {
		return fmt.Errorf("there was a problem executing the delete query: %w", err)
	}

	numRows, err := result.RowsAffected()

	if err != nil {
		return fmt.Errorf("there was a problem with executing RowsAffected: %w", err)
	}

	if numRows < 1 {
		return customErrors.ErrNotFound
	}

	return nil
}
