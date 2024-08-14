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
		first_name TEXT NOT NULL,
		last_name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password_hash TEXT NOT NULL,
		date_registered DATETIME NOT NULL
	)
	`

	_, err := Db.Exec(usersTable)

	if(err != nil){
		panic("Could not create users table.")
	}
}