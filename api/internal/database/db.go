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
}

func RunMigrationsAndSeedData() {
	err := Db.AutoMigrate(
		&entities.User{},
		&entities.Session{},
		&entities.Anime{},
		&entities.UserAnime{},
		&entities.Character{},
		&entities.AnimeCharacter{},
		&entities.Genre{},
		&entities.VoiceActor{},
		&entities.Studio{},
	)

	if err != nil {
		log.Fatal("Failed to to run database migrations: ", err)
	}

	log.Println("Database migrations completed successfully")

	err = SeedInitialData(Db)

	if err != nil {
		log.Fatal("Failed to seed initial data: %w", err)
	}

	log.Println("Seeded initial data successfully")
}