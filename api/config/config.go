package config

import (
	"github.com/joho/godotenv"
)

func InitEnvVariables(){
	err := godotenv.Load()
	
	if(err != nil){
		panic(err)
	}
}