package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func InitEnvVariables(){
	if(os.Getenv("RENDER") == ""){
		err := godotenv.Load("./.env")
		
		if(err != nil){
			fmt.Printf("Error loading .env: %v\n", err)
			panic(err)
		}
	}
}