package useranimeservice

import (
	"fmt"
	"myanimevault/internal/database"
)

func GetIdList(userId string) ([]int64, error) {
	var animeIdList []int64 = []int64{}

	query := `
	SELECT anime_id
	FROM userAnimes
	WHERE user_id = $1
	`

	stmt, err := database.Db.Prepare(query)

	if err != nil {
		return animeIdList, fmt.Errorf("an error occurred while preparing the query: %w", err)
	}

	defer stmt.Close()
	rows, err := stmt.Query(userId)

	if err != nil {
		return animeIdList, fmt.Errorf("an error occurred while executing the query statement: %w", err)
	}

	for rows.Next() {
		var id int64
		err = rows.Scan(&id)
		if err != nil {
			return animeIdList, fmt.Errorf("an error occurred while scanning the db rows: %w", err)
		}

		animeIdList = append(animeIdList, id)
	}

	return animeIdList, nil
}
