package imageservice

import (
	"bytes"
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func (s *ImageService) UploadPoster(ctx context.Context, imageData []byte, animeTitle string, imageExt string) (string, error) {
	filename := fmt.Sprintf("posters/%s-%d%s", strings.ReplaceAll(strings.ToLower(animeTitle), " ", "-"), time.Now().Unix(), imageExt)

	// Upload to S3
	_, err := s.s3Client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(filename),
		Body:        bytes.NewReader(imageData),
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload poster to S3: %w", err)
	}

	//return filename (aka the s3 key)
	return filename, nil
}

func (s *ImageService) UploadBanner(ctx context.Context, imageData []byte, animeTitle string, imageExt string) (string, error) {
	// Generate unique filename for banner
	filename := fmt.Sprintf("banners/%s-%d%s", strings.ReplaceAll(strings.ToLower(animeTitle), " ", "-"), time.Now().Unix(), imageExt)

	// Upload to S3
	_, err := s.s3Client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(filename),
		Body:        bytes.NewReader(imageData),
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload banner to S3: %w", err)
	}

	//return filename (aka the s3 key)
	return filename, nil
}
