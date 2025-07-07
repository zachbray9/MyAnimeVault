package utils

import (
	"crypto/sha256"
	"encoding/hex"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func ComparePasswordWithHash(password string, hashedPassword string) bool{
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	
	return err == nil
}

func HashToken(token string) string {
    hash := sha256.New()
    hash.Write([]byte(token))
    return hex.EncodeToString(hash.Sum(nil))
}

func CompareTokenWithHash(actualToken string, storedHash string) bool {
    hashedToken := HashToken(actualToken)
    return hashedToken == storedHash
}