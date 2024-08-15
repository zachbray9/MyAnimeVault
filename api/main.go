package main

import (
	"fmt"
	"myanimevault/config"
	"myanimevault/controllers"
	"myanimevault/database"

	"github.com/gin-gonic/gin"
)

func main() {

	config.InitEnvVariables()
	database.InitDb()
	var server = gin.Default()

	controllers.RegisterEndpoints(server)

	server.Run(":8080")
}

