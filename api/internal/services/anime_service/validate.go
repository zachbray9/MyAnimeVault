package animeservice

import (
	"fmt"
	"myanimevault/internal/database"
	"myanimevault/internal/models/requests"
	genrerepo "myanimevault/internal/repository/genre_repository"
	studiorepo "myanimevault/internal/repository/studio_repository"
)

func (s *AnimeService) ValidateAnimeData(req requests.CreateAnimeRequest) error {
	if req.EnglishTitle == "" {
		return fmt.Errorf("english title is required")
	}

	if req.RomajiTitle == "" {
		return fmt.Errorf("romaji title is required")
	}

	if req.Synopsis == "" {
		return fmt.Errorf("synopsis is required")
	}

	if req.Format == "" {
		return fmt.Errorf("format is required")
	}

	if req.Status == "" {
		return fmt.Errorf("status is required")
	}

	if req.Duration == nil {
		return fmt.Errorf("duration is required")
	}

	if req.Season == "" {
		return fmt.Errorf("season is required")
	}

	if req.SeasonYear == nil {
		return fmt.Errorf("season year is required")
	}

	if req.AgeRating == "" {
		return fmt.Errorf("age rating is required")
	}

	if req.StudioId == 0 {
		return fmt.Errorf("studio is required")
	}

	if len(req.Genres) == 0 {
		return fmt.Errorf("at least one genre is required")
	}

	//validate studio exists
	studioExists, err := studiorepo.Exists(database.Db, req.StudioId)
	if err != nil {
		return fmt.Errorf("there was a problem checking if studio exists: %w", err)
	}
	if !studioExists {
		return fmt.Errorf("studio not found")
	}

	//validate genres exist
	genreExists, err := genrerepo.ExistsAll(database.Db, req.Genres)
	if err != nil {
		return fmt.Errorf("there was a problem checking if genres exist: %w", err)
	}
	if !genreExists {
		return fmt.Errorf("one or more genres not found")
	}

	return nil
}
