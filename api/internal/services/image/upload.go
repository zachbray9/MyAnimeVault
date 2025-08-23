package image

import (
	"bytes"
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
)

func (s *ImageService) UploadPoster(ctx context.Context, imageData []byte, animeTitle string) (string, error) {
	filename := fmt.Sprintf("posters/%s-%d.jpg",
		strings.ReplaceAll(strings.ToLower(animeTitle), " ", "-"),
		time.Now().Unix())

	// Upload to S3
	_, err := s.s3Client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(filename),
		Body:        bytes.NewReader(imageData),
		ContentType: aws.String("image/jpeg"),
		ACL:         types.ObjectCannedACLPublicRead,
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload poster to S3: %w", err)
	}

	// Return the public URL
	imageURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", s.bucket, s.region, filename)
	return imageURL, nil
}

func (s *ImageService) UploadBanner(ctx context.Context, imageData []byte, animeTitle string) (string, error) {
	// Generate unique filename for banner
	filename := fmt.Sprintf("banners/%s-%d.jpg",
		strings.ReplaceAll(strings.ToLower(animeTitle), " ", "-"),
		time.Now().Unix())

	// Upload to S3
	_, err := s.s3Client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(filename),
		Body:        bytes.NewReader(imageData),
		ContentType: aws.String("image/jpeg"),
		ACL:         types.ObjectCannedACLPublicRead,
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload banner to S3: %w", err)
	}

	// Return the public URL
	imageURL := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", s.bucket, s.region, filename)
	return imageURL, nil
}
