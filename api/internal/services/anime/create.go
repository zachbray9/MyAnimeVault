package animeservice

import (
	"context"
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/entities"
	"myanimevault/internal/models/requests"
	"myanimevault/internal/utils"

	"gorm.io/gorm"
)

func (s *AnimeService)Create(context context.Context, req requests.CreateAnimeRequest) (*entities.Anime, error) {
	anime := entities.Anime{}

	err := database.Db.WithContext(context).Transaction(func(tx *gorm.DB) error {
		err := s.ValidateAnimeData(req)
		if err != nil {
			return fmt.Errorf("invalid create anime request: %w", err)
		}

		//upload poster image to s3
		posterUrl := ""
		if req.Poster != "" {
			posterData, err := utils.DecodeBase64Image(req.Poster)
			if err != nil {
				return fmt.Errorf("failed to decode base64 image for poster: %w", err)
			}

			posterUrl, err = s.imageService.UploadPoster(context, posterData, req.EnglishTitle)
			if err != nil {
				return fmt.Errorf("failed to upload poster image to s3: %w", err)
			}
		}

		//upload banner image to s3
		bannerUrl := ""
		if req.Banner != "" {
			bannerData, err := utils.DecodeBase64Image(req.Banner)
			if err != nil {
				return fmt.Errorf("failed to decode base64 image for banner: %w", err)
			}

			bannerUrl, err = s.imageService.UploadBanner(context, bannerData, req.EnglishTitle)
			if err != nil {
				return fmt.Errorf("failed to upload banner image to s3: %w", err)
			}
		}

		//map CreateAnimeRequest to Anime
		anime.EnglishTitle = req.EnglishTitle
		anime.RomajiTitle = req.RomajiTitle
		anime.Synopsis = req.Synopsis
		anime.Format = req.Format
		anime.Status = req.Status
		anime.Episodes = req.Episodes
		anime.Duration = req.Duration
		anime.StartDate = req.StartDate
		anime.EndDate = req.EndDate
		anime.Season = req.Season
		anime.SeasonYear = req.SeasonYear
		anime.PosterUrl = posterUrl
		anime.BannerUrl = bannerUrl
		anime.TrailerUrl = req.TrailerUrl
		anime.IsAdult = req.IsAdult
		anime.AgeRating = req.AgeRating
		anime.AgeRatingGuide = req.AgeRatingGuide
		anime.MalId = req.MalId
		anime.AnilistId = req.AnilistId
		anime.StudioId = &req.StudioId

		//Add anime to database
		err = s.animeRepo.Create(context, tx, &anime)
		if err != nil {
			return fmt.Errorf("failed to add anime to the database: %w", err)
		}

		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("anime service create method failed: %w", err)
	}

	return &anime, nil
}
