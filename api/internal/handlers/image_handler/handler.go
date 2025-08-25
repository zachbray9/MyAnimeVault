package imagehandler

import (
	imageservice "myanimevault/internal/services/image_service"
)

type ImageHandler struct {
	ImageService *imageservice.ImageService
}

func NewImageHandler(ImageService *imageservice.ImageService) *ImageHandler {
	return &ImageHandler{
		ImageService: ImageService,
	}
}