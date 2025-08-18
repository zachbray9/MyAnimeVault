package database

import (
	"log"
	"myanimevault/internal/models/entities"
	"os"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var Db *gorm.DB

func InitDb() {
	var err error

	connectionString := os.Getenv("CONNECTION_STRING")

	Db, err = gorm.Open(postgres.Open(connectionString), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	sqlDb, err := Db.DB()
	if err != nil {
		log.Fatal("Failed to get underlying sql database: ", err)
	}

	sqlDb.SetMaxOpenConns(25)
	sqlDb.SetMaxIdleConns(5)

	log.Println("Database connected successfully")
	// var err error
	// Db, err = sql.Open("postgres", os.Getenv("CONNECTION_STRING"))

	// if(err != nil){
	// 	panic("The database could not be initialized: " + err.Error())
	// }
	// Db.SetMaxOpenConns(10)
	// Db.SetMaxIdleConns(5)

	// createTables()
}

func RunMigrations() {
	err := Db.AutoMigrate(
		&entities.User{},
		&entities.Session{},
		&entities.Anime{},
		&entities.UserAnime{},
	)

	if err != nil {
		log.Fatal("Failed to to run database migrations: ", err)
	}

	log.Println("Database migrations completed successfully")
}

// func createTables(){
// 	usersTable := `
// 	CREATE TABLE IF NOT EXISTS users (
// 		id UUID PRIMARY KEY NOT NULL,
// 		email VARCHAR(255) NOT NULL UNIQUE,
// 		password_hash VARCHAR(255) NOT NULL,
// 		date_registered TIMESTAMPTZ NOT NULL
// 	)
// 	`

// 	_, err := Db.Exec(usersTable)

// 	if(err != nil){
// 		panic("Could not create users table: " + err.Error())
// 	}

// 	userAnimesTable := `
// 	CREATE TABLE IF NOT EXISTS userAnimes (
// 		id UUID PRIMARY KEY NOT NULL,
// 		user_id UUID NOT NULL,
// 		anime_id INT NOT NULL,
// 		english_title VARCHAR(255),
// 		romaji_title VARCHAR(255),
// 		large_poster VARCHAR(2083),
// 		medium_poster VARCHAR(2083),
// 		format VARCHAR(50),
// 		season VARCHAR(50),
// 		season_year INT,
// 		watch_status VARCHAR(50),
// 		rating INT,
// 		num_episodes_watched INT,
// 		episodes INT,
// 		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// 	)
// 	`

// 	_, err = Db.Exec(userAnimesTable)

// 	if(err != nil){
// 		panic("Could not create userAnimes table: " + err.Error())
// 	}

// 	sessionsTable := `
// 	CREATE TABLE IF NOT EXISTS sessions (
// 		id UUID PRIMARY KEY NOT NULL,
// 		user_id UUID NOT NULL,
// 		device_id TEXT NOT NULL,
// 		created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
// 		expires_at TIMESTAMPTZ NOT NULL,
// 		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// 	)
// 	`

// 	_, err = Db.Exec(sessionsTable)

// 	if(err != nil){
// 		panic("Could not create sessions table: " + err.Error())
// 	}
// }
