package imagehandler

import (
	"io"
	"myanimevault/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *ImageHandler) UploadImageHandler(context *gin.Context) {
	file, header, err := context.Request.FormFile("image")
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error":   "file_required",
			"message": "No image file provided",
		})
		return
	}
	defer file.Close()

	//validate file type
	contentType := header.Header.Get("Content-Type")
	fileType := utils.GetExtensionFromContentType(contentType)
	if !utils.IsValidImageType(fileType) {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid_file_type", "message": "File must be an image (JPEG, PNG, or WebP)"})
		return
	}

	//validate image size
	if !utils.IsValidImageSize(header.Size) {
		context.JSON(http.StatusBadRequest, gin.H{
			"error":   "file_too_large",
			"message": "Image must be smaller than 10MB",
		})
		return
	}

	// Get image type and anime title from form data
	imageType := context.PostForm("type")   // "poster" or "banner"
	animeTitle := context.PostForm("title") // anime title for filename

	if imageType == "" {
		context.JSON(http.StatusBadRequest, gin.H{
			"error":   "type_required",
			"message": "Image type (poster or banner) is required",
		})
		return
	}

	if animeTitle == "" {
		context.JSON(http.StatusBadRequest, gin.H{
			"error":   "title_required",
			"message": "Anime title is required for filename",
		})
		return
	}

	// Read file data into bytes
	fileData, err := io.ReadAll(file)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error":   "file_read_error",
			"message": "Failed to read uploaded file",
		})
		return
	}

	// Upload using appropriate method based on type
	var s3key string
	switch imageType {
	case "poster":
		s3key, err = h.ImageService.UploadPoster(context, fileData, animeTitle, fileType)
	case "banner":
		s3key, err = h.ImageService.UploadBanner(context, fileData, animeTitle, fileType)
	default:
		context.JSON(http.StatusBadRequest, gin.H{
			"error":   "invalid_type",
			"message": "Image type must be 'poster' or 'banner'",
		})
		return
	}

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error":   "upload_failed",
			"message": "Failed to upload image to storage",
		})
		return
	}

	// Return the S3 URL
	context.JSON(http.StatusOK, gin.H{"s3key":  s3key})
}
