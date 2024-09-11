package config

import (
	"os"

	"github.com/joho/godotenv"
)

func InitEnvVariables(){
	if(os.Getenv("RENDER") == ""){
		err := godotenv.Load()
		
		if(err != nil){
			panic(err)
		}
	}
}