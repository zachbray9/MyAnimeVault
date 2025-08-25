package utils

func IsValidImageType(imageExt string) bool {
	validTypes := []string{
		".jpg",
		".png",
		".webp",
	}

	for _, validType := range validTypes {
		if imageExt == validType {
			return true
		}
	}
	return false
}

func IsValidImageSize(fileSize int64) bool {
	const MAX_FILE_SIZE = 10 * 1024 * 1024 //10mb
	return fileSize <= MAX_FILE_SIZE
}

func GetExtensionFromContentType(contentType string) string {
	switch contentType {
	case "image/jpeg", "image/jpg":
		return ".jpg"
	case "image/png":
		return ".png"
	case "image/webp":
		return ".webp"
	default:
		return ".jpg"
	}
}
