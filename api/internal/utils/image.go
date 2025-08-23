package utils

import (
	"encoding/base64"
	"fmt"
	"strings"
)

func DecodeBase64Image(base64Str string) ([]byte, error) {
	// Remove data:image/jpeg;base64, prefix if present
	if strings.Contains(base64Str, ",") {
		base64Str = strings.Split(base64Str, ",")[1]
	}

	imageData, err := base64.StdEncoding.DecodeString(base64Str)
	if err != nil {
		return nil, fmt.Errorf("failed to decode base64 image: %w", err)
	}

	return imageData, nil
}
