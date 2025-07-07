package config

import (
	"os"

	"github.com/joho/godotenv"
)

func InitEnvVariables(){
	if(os.Getenv("RENDER") == ""){
		err := godotenv.Load("./.env")
		
		if(err != nil){
			panic(err)
		}
	}
}