package main

import (
	"myanimevault/config"
	"myanimevault/controllers"
	"myanimevault/database"
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
	config.AllowOrigins = []string{"https://localhost:5173"}
	config.AllowHeaders = []string{"Authorization", "Content-Type"}
	config.AllowCredentials = true

	server.Use(cors.New(config))

	if(os.Getenv("MODE") == "production"){
		server.Static("/", "./wwwroot")
		// server.Static("/assets", "./wwwroot/assets")
		// server.StaticFile("/", "./wwwroot/index.html")
		// server.StaticFile("/site.webmanifest", "./wwwroot/site.webmanifest")
		server.NoRoute(func (context *gin.Context){
			context.File("./wwwroot/index.html")
		})
	}

	controllers.RegisterEndpoints(server)

	port := os.Getenv("PORT")
	server.Run("0.0.0.0:" + port)
}

