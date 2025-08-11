package main

import (
	"myanimevault/config"
	"myanimevault/internal/database"
	"myanimevault/internal/routes"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	config.InitEnvVariables()

	if os.Getenv("MODE") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	database.InitDb()
	var server = gin.Default()

	//cors policy
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowHeaders = []string{"Authorization", "Content-Type"}
	config.AllowCredentials = true

	server.Use(cors.New(config))

	//initialize api endpoints
	routes.InitRouter(server)

	port := os.Getenv("PORT")
	server.Run("0.0.0.0:" + port)
}
