package imageservice

import (
	"context"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func (s *ImageService) GeneratePresignedUrl(ctx context.Context, s3Key string, expiration time.Duration) (string, error) {
	if s3Key == "" {
		return "", fmt.Errorf("S3 key cannot be empty")
	}

	// Create a presign client
	presignClient := s3.NewPresignClient(s.s3Client)

	// Generate the presigned URL
	request, err := presignClient.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(s.bucket),
		Key:    aws.String(s3Key),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = expiration
	})

	if err != nil {
		return "", fmt.Errorf("failed to generate presigned URL: %w", err)
	}

	return request.URL, nil
}
