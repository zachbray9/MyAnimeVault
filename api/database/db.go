package database

import(
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var Db *sql.DB

func InitDb(){
	Db, err := sql.Open("sqlite3", "myanimevault.db")

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
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		firstName TEXT NOT NULL,
		lastName TEXT NOT NULL,
		email TEXT NOT NULL,
		passwordHash TEXT NOT NULL
	)
	`

	_, err := Db.Exec(usersTable)

	if(err != nil){
		panic("Could not create usersTable.")
	}
}