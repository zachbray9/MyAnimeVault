package main

import (
	"github.com/gin-gonic/gin"
	"myanimevault/database"
	"myanimevault/controllers"
)

func main() {
	database.InitDb()
	var server = gin.Default()

	controllers.RegisterEndpoints(server)

	server.Run(":8080")
}

