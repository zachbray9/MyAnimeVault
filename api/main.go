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

	if os.Getenv("MODE") == "production" {

		server.Static("/assets", "./wwwroot/assets")

		server.StaticFile("/android-chrome-192x192.png", "./wwwroot/android-chrome-192x192.png")
		server.StaticFile("/android-chrome-512x512.png", "./wwwroot/android-chrome-512x512.png")
		server.StaticFile("/apple-touch-icon.png", "./wwwroot/apple-touch-icon.png")
		server.StaticFile("/browserconfig.xml", "./wwwroot/browserconfig.xml")	
		server.StaticFile("/favicon-16x16.png", "./wwwroot/favicon-16x16.png")
		server.StaticFile("/favicon-32x32.png", "./wwwroot/favicon-32x32.png")
		server.StaticFile("/favicon.ico", "./wwwroot/favicon.ico")
		server.StaticFile("/mstile-150x150.png", "./wwwroot/mstile-150x150.png")
		server.StaticFile("/safari-pinned-tab.svg", "./wwwroot/safari-pinned-tab.svg")
		server.StaticFile("/site.webmanifest", "./wwwroot/site.webmanifest")

		server.NoRoute(func (c *gin.Context){
			c.File("./wwwroot/index.html")
		})

	}

	controllers.RegisterEndpoints(server)

	port := os.Getenv("PORT")
	server.Run("0.0.0.0:" + port)
}
