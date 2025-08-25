package imageservice

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type ImageService struct {
	s3Client *s3.Client
	bucket   string
	region   string
}

func NewImageService(region string, bucket string) (*ImageService, error) {
	cfg, err := config.LoadDefaultConfig(
		context.Background(), 
		config.WithRegion(region),
	)

	if err != nil {
		return nil, fmt.Errorf("failed to load aws config: %w", err)
	}

	return &ImageService{
		s3Client: s3.NewFromConfig(cfg),
		bucket:   bucket,
		region:   region,
	}, nil
}
