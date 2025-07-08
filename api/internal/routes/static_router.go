package routes

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func InitStaticRoutes(server *gin.Engine) {
	if os.Getenv("MODE") == "production" {
		// server.Static("/assets", "./wwwroot/assets")

		// server.StaticFile("/android-chrome-192x192.png", "./wwwroot/android-chrome-192x192.png")
		// server.StaticFile("/android-chrome-512x512.png", "./wwwroot/android-chrome-512x512.png")
		// server.StaticFile("/apple-touch-icon.png", "./wwwroot/apple-touch-icon.png")
		// server.StaticFile("/browserconfig.xml", "./wwwroot/browserconfig.xml")
		// server.StaticFile("/favicon-16x16.png", "./wwwroot/favicon-16x16.png")
		// server.StaticFile("/favicon-32x32.png", "./wwwroot/favicon-32x32.png")
		// server.StaticFile("/favicon.ico", "./wwwroot/favicon.ico")
		// server.StaticFile("/mstile-150x150.png", "./wwwroot/mstile-150x150.png")
		// server.StaticFile("/safari-pinned-tab.svg", "./wwwroot/safari-pinned-tab.svg")
		// server.StaticFile("/site.webmanifest", "./wwwroot/site.webmanifest")

		// server.NoRoute(func(c *gin.Context) {
		// 	// Don't serve index.html for API routes
		// 	if c.Request.URL.Path[:4] == "/api" {
		// 		c.JSON(http.StatusNotFound, gin.H{"error": "API route not found"})
		// 		return
		// 	}

		// 	c.File("./wwwroot/index.html")
		// })

		// Serve static files from wwwroot/assets (your CSS, JS, etc.)
		server.Static("/assets", "./wwwroot/assets")

		// Serve individual files from wwwroot root
		server.StaticFile("/favicon.ico", "./wwwroot/favicon.ico")
		server.StaticFile("/site.webmanifest", "./wwwroot/site.webmanifest")
		server.StaticFile("/android-chrome-192x192.png", "./wwwroot/android-chrome-192x192.png")
		server.StaticFile("/android-chrome-512x512.png", "./wwwroot/android-chrome-512x512.png")
		server.StaticFile("/apple-touch-icon.png", "./wwwroot/apple-touch-icon.png")
		server.StaticFile("/browserconfig.xml", "./wwwroot/browserconfig.xml")
		server.StaticFile("/favicon-16x16.png", "./wwwroot/favicon-16x16.png")
		server.StaticFile("/favicon-32x32.png", "./wwwroot/favicon-32x32.png")
		server.StaticFile("/mstile-150x150.png", "./wwwroot/mstile-150x150.png")
		server.StaticFile("/safari-pinned-tab.svg", "./wwwroot/safari-pinned-tab.svg")
		// Add any other static files you have in wwwroot

		// Handle all remaining routes
		server.NoRoute(func(c *gin.Context) {
			// Don't serve index.html for API routes
			if len(c.Request.URL.Path) >= 4 && c.Request.URL.Path[:4] == "/api" {
				c.JSON(http.StatusNotFound, gin.H{"error": "API route not found"})
				return
			}

			// Serve index.html for everything else (React routing)
			c.File("./wwwroot/index.html")
		})

	}
}
