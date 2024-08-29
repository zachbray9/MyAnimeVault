package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var Db *sql.DB

func InitDb(){
	var err error
	Db, err = sql.Open("sqlite3", "myanimevault.db")

	if(err != nil){
		panic("The database could not be initialized.")
	}
	Db.SetMaxOpenConns(10)
	Db.SetMaxIdleConns(5)
	
	createTables()
}

func createTables(){
	usersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id TEXT NOT NULL PRIMARY KEY,
		email TEXT NOT NULL UNIQUE,
		password_hash TEXT NOT NULL,
		date_registered DATETIME NOT NULL
	)
	`

	_, err := Db.Exec(usersTable)

	if(err != nil){
		panic("Could not create users table.")
	}

	userAnimesTable := `
	CREATE TABLE IF NOT EXISTS userAnimes (
		id TEXT NOT NULL PRIMARY KEY,
		user_id TEXT NOT NULL,
		anime_id INTEGER NOT NULL,
		english_title TEXT,
		romaji_title TEXT,
		large_poster TEXT,
		medium_poster TEXT,
		format TEXT,
		season TEXT,
		season_year INTEGER,
		watch_status TEXT,
		rating INTEGER,
		num_episodes_watched INTEGER,
		episodes INTEGER,
		FOREIGN KEY (user_id) REFERENCES users(id)
	)
	`

	_, err = Db.Exec(userAnimesTable)

	if(err != nil){
		panic("Could not create userAnimes table.")
	}
}