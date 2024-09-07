package main

import (
	"myanimevault/config"
	"myanimevault/controllers"
	"myanimevault/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	config.InitEnvVariables()
	database.InitDb()
	var server = gin.Default()

	//cors policy
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"https://localhost:5173"}
	config.AllowHeaders = []string{"Authorization", "Content-Type"}
	config.AllowCredentials = true

	server.Use(cors.New(config))

	controllers.RegisterEndpoints(server)

	server.Run(":8080")
}

