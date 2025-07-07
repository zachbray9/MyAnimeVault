package main

import (
	"log"
	"myanimevault/config"
	"myanimevault/internal/database"
	"myanimevault/internal/routes"
	"os"
	"path/filepath"

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

	if os.Getenv("MODE") == "production" {
		rootDir, err := os.Getwd()

		if err != nil {
			log.Fatal(err)
		}

		wwwrootPath := filepath.Join(rootDir, "wwwroot")
		log.Println("Serving static files from:", wwwrootPath)

		server.Static("/", wwwrootPath)

		// server.Static("/assets", filepath.Join(wwwrootPath, "assets"))

		// server.StaticFile("/android-chrome-192x192.png", filepath.Join(wwwrootPath, "android-chrome-192x192.png"))
		// server.StaticFile("/android-chrome-512x512.png", filepath.Join(wwwrootPath, "android-chrome-512x512.png"))
		// server.StaticFile("/apple-touch-icon.png", filepath.Join(wwwrootPath, "apple-touch-icon.png"))
		// server.StaticFile("/browserconfig.xml", filepath.Join(wwwrootPath, "browserconfig.xml"))	
		// server.StaticFile("/favicon-16x16.png", filepath.Join(wwwrootPath, "favicon-16x16.png"))
		// server.StaticFile("/favicon-32x32.png", filepath.Join(wwwrootPath, "favicon-32x32.png"))
		// server.StaticFile("/favicon.ico", filepath.Join(wwwrootPath, "favicon.ico"))
		// server.StaticFile("/mstile-150x150.png", filepath.Join(wwwrootPath, "mstile-150x150.png"))
		// server.StaticFile("/safari-pinned-tab.svg", filepath.Join(wwwrootPath, "safari-pinned-tab.svg"))
		// server.StaticFile("/site.webmanifest", filepath.Join(wwwrootPath, "site.webmanifest"))

		server.NoRoute(func (c *gin.Context){
			c.File(filepath.Join(wwwrootPath, "index.html"))
		})

	}

	routes.InitRouter(server)

	port := os.Getenv("PORT")
	server.Run("0.0.0.0:" + port)
}
