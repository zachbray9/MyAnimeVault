package database

import (
	"log"
	"myanimevault/internal/models/entities"
	"myanimevault/internal/utils"

	"gorm.io/gorm"
)

func SeedInitialData(db *gorm.DB) error {
	// Seed genres first
	if err := seedGenres(db); err != nil {
		return err
	}

	// Seed studios
	_, err := seedStudios(db)
	if err != nil {
		return err
	}

	// Seed anime with relationships
	if err := seedAnime(db); err != nil {
		return err
	}

	log.Println("✅ Database seeded successfully with sample data!")
	log.Println("💡 This sample data will be updated as users contribute real anime information")
	return nil
}

func seedGenres(db *gorm.DB) error {
	genres := []entities.Genre{
		{Name: "Action", Description: "High-energy sequences with combat, chases, and adventure"},
		{Name: "Adventure", Description: "Journey-focused stories with exploration and discovery"},
		{Name: "Comedy", Description: "Humorous content designed to entertain and amuse"},
		{Name: "Drama", Description: "Character-driven stories with emotional depth"},
		{Name: "Ecchi", Description: "Playful fanservice with teasing, awkward encounters, and risqué comedy"},
		{Name: "Fantasy", Description: "Stories with magical, supernatural, or otherworldly elements"},
		{Name: "Horror", Description: "Dark and unsettling stories with fear, suspense, and supernatural or psychological terror"},
		{Name: "Mahou shoujo", Description: "Whimsical adventures of young heroines who use magical powers to protect the world and discover themselves"},
		{Name: "Mecha", Description: "Futuristic battles and drama featuring giant robots and their pilots"},
		{Name: "Music", Description: "Stories centered on bands, idols, and the power of performance and song"},
		{Name: "Mystery", Description: "Intriguing plots with secrets, clues, and suspenseful investigations"},
		{Name: "Psychological", Description: "Mind-bending stories that explore human emotions, manipulation, and the darker sides of the psyche"},
		{Name: "Romance", Description: "Stories focused on romantic relationships and love"},
		{Name: "Sci-Fi", Description: "Science fiction with futuristic or technological themes"},
		{Name: "Slice of Life", Description: "Realistic portrayals of everyday life and activities"},
		{Name: "Sports", Description: "Competitive stories of athletes chasing victory, teamwork, and personal growth through their game"},
		{Name: "Supernatural", Description: "Stories featuring otherworldly powers, spirits, and phenomena beyond the natural world"},
		{Name: "Thriller", Description: "Tense and suspenseful stories full of danger, twists, and high-stakes situations"},
	}

	for _, genre := range genres {
		if err := db.FirstOrCreate(&genre, entities.Genre{Name: genre.Name}).Error; err != nil {
			return err
		}
	}

	log.Printf("✅ Seeded %d genres\n", len(genres))
	return nil
}

func seedStudios(db *gorm.DB) ([]entities.Studio, error) {
	studios := []entities.Studio{
		{
			Name:    "Toei Animation",
			Website: "https://www.toei-animation-usa.com/",
		},
		{
			Name:    "Studio Pierrot",
			Website: "https://www.pierrot.co.jp/",
		},
		{
			Name:    "Madhouse",
			Website: "https://www.madhouse.co.jp/",
		},
		{
			Name:    "Studio Bones",
			Website: "https://www.bones.co.jp/",
		},
		{
			Name:    "Kyoto Animation",
			Website: "https://www.kyotoanimation.co.jp/en/",
		},
		{
			Name:    "Wit Studio",
			Website: "https://www.witstudio.co.jp/",
		},
		{
			Name:    "MAPPA",
			Website: "https://www.mappa.co.jp/",
		},
		{
			Name:    "Ufotable",
			Website: "https://www.ufotable.com/",
		},
		{
			Name:    "Studio Ghibli",
			Website: "https://www.ghibli.jp/",
		},
		{
			Name:    "Sunrise",
			Website: "https://www.sunrise-inc.co.jp/international/",
		},
		{
			Name:    "A-1 Pictures",
			Website: "https://a1p.jp/",
		},
		{
			Name:    "Studio Trigger",
			Website: "https://www.st-trigger.co.jp/",
		},
		{
			Name:    "8-bit",
			Website: "https://8bit-studio.co.jp/",
		},
		{
			Name:    "CoMix Wave Films",
			Website: "https://www.cwfilms.jp/",
		},
		{
			Name:    "Arvo Animation",
			Website: "https://arvo-animation.co.jp/",
		},
		{
			Name:    "Production I.G",
			Website: "https://www.production-ig.co.jp/",
		},
		{
			Name:    "Asahi Production",
			Website: "https://asahi-pro.co.jp/",
		},
	}

	var createdStudios []entities.Studio
	for _, studio := range studios {
		if err := db.FirstOrCreate(&studio, entities.Studio{Name: studio.Name}).Error; err != nil {
			return nil, err
		}
		createdStudios = append(createdStudios, studio)
	}

	log.Printf("✅ Seeded %d studios\n", len(studios))
	return createdStudios, nil
}

func seedAnime(db *gorm.DB) error {
	// Get some genres and tags for relationships
	var action, adventure, comedy, drama, ecchi, fantasy, horror, mahou_shoujo, mecha, music, mystery, psychological, romance, sci_fi, slice_of_life, sports, supernatural, thriller entities.Genre

	db.Where("name = ?", "Action").First(&action)
	db.Where("name = ?", "Romance").First(&adventure)
	db.Where("name = ?", "Comedy").First(&comedy)
	db.Where("name = ?", "Drama").First(&drama)
	db.Where("name = ?", "Action").First(&ecchi)
	db.Where("name = ?", "Romance").First(&fantasy)
	db.Where("name = ?", "Comedy").First(&horror)
	db.Where("name = ?", "Drama").First(&mahou_shoujo)
	db.Where("name = ?", "Action").First(&mecha)
	db.Where("name = ?", "Romance").First(&music)
	db.Where("name = ?", "Comedy").First(&mystery)
	db.Where("name = ?", "Drama").First(&psychological)
	db.Where("name = ?", "Action").First(&romance)
	db.Where("name = ?", "Romance").First(&sci_fi)
	db.Where("name = ?", "Comedy").First(&slice_of_life)
	db.Where("name = ?", "Drama").First(&sports)
	db.Where("name = ?", "Action").First(&supernatural)
	db.Where("name = ?", "Romance").First(&thriller)

	findStudio := func(name string) *uint {
		var studio entities.Studio
		if err := db.Where("name = ?", name).First(&studio).Error; err != nil {
			log.Printf("Warning: Studio '%s' not found", name)
			return nil
		}
		return &studio.Id
	}

	// Create sample anime with varied data
	animeList := []struct {
		anime  entities.Anime
		genres []entities.Genre
		studioName string
	}{
		{
			anime: entities.Anime{
				EnglishTitle: "Attack on Titan",
				RomajiTitle:  "Shingeki no Kyojin",
				Synopsis:     "In a world where humanity is on the brink of extinction, giant humanoid creatures known as Titans relentlessly hunt the last survivors. Young soldier Eren Yeager, along with his friends Mikasa and Armin, joins the fight to reclaim their world, uncover the Titans’ mysterious origins, and confront dark truths that could change everything.",
				Format:       "TV",
				Status:       "FINISHED",
				Episodes:     utils.IntPtr(25),
				Duration:     utils.IntPtr(24),
				Season:       "SPRING",
				SeasonYear:   utils.IntPtr(2013),
				AgeRating:    "R",
				IsAdult:      false,
			},
			genres: []entities.Genre{action, drama, fantasy, mystery},
			studioName: "Wit Studio",
		},
		{
			anime: entities.Anime{
				EnglishTitle: "Demon Slayer",
				RomajiTitle:  "Kimetsu No Yaiba",
				Synopsis:     "After his family is murdered by demons, Tanjiro Kamado becomes a demon slayer to save his sister Nezuko, who has been turned into a demon but still retains her humanity.",
				Format:       "TV",
				Status:       "FINISHED",
				Episodes:     utils.IntPtr(26),
				Duration:     utils.IntPtr(24),
				Season:       "SPRING",
				SeasonYear:   utils.IntPtr(2019),
				AgeRating:    "PG-13",
				IsAdult:      false,
			},
			genres: []entities.Genre{action, adventure, drama, fantasy, supernatural},
			studioName: "Ufotable",
		},
		{
			anime: entities.Anime{
				EnglishTitle: "My Hero Academia",
				RomajiTitle:  "Boku No Hero Academia",
				Synopsis:     "In a world where most people have superpowers called 'Quirks', Izuku Midoriya dreams of becoming a hero despite being born without powers. His life changes when he meets the greatest hero, All Might.",
				Format:       "TV",
				Status:       "FINISHED",
				Episodes:     utils.IntPtr(13),
				Duration:     utils.IntPtr(24),
				Season:       "SPRING",
				SeasonYear:   utils.IntPtr(2016),
				AgeRating:    "PG-13",
				IsAdult:      false,
			},
			genres: []entities.Genre{action, adventure, comedy},
			studioName: "Studio Bones",
		},
		{
			anime: entities.Anime{
				EnglishTitle: "Jujutsu Kaisen",
				RomajiTitle:  "Jujutsu Kaisen",
				Synopsis:     "High school student Yuji Itadori swallows a cursed finger to save his friends, becoming host to a powerful curse. He joins Tokyo Jujutsu High to learn to control this power and fight other curses.",
				Format:       "TV",
				Status:       "FINISHED",
				Episodes:     utils.IntPtr(24),
				Duration:     utils.IntPtr(24),
				Season:       "FALL",
				SeasonYear:   utils.IntPtr(2020),
				AgeRating:    "R",
				IsAdult:      false,
			},
			genres: []entities.Genre{action, drama, supernatural},
			studioName: "MAPPA",
		},
		{
			anime: entities.Anime{
				EnglishTitle: "Your Name.",
				RomajiTitle:  "Kimi no Na wa.",
				Synopsis:     "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things become even more complicated when the boy and girl decide to meet in person.",
				Format:       "MOVIE",
				Status:       "FINISHED",
				Episodes:     utils.IntPtr(1),
				Duration:     utils.IntPtr(106),
				Season:       "SUMMER",
				SeasonYear:   utils.IntPtr(2016),
				AgeRating:    "PG",
				IsAdult:      false,
			},
			genres: []entities.Genre{drama, romance, supernatural},
			studioName: "CoMix Wave Films",
		},
		{
			anime: entities.Anime{
				EnglishTitle: "One Piece",
				RomajiTitle:  "One Piece",
				Synopsis:     "Monkey D. Luffy, a young pirate with rubber powers gained from eating a Devil Fruit, sets sail from East Blue on a quest to find the legendary treasure known as 'One Piece' and become the next Pirate King. Along his journey, he assembles a diverse crew of skilled misfits called the Straw Hat Pirates, each with their own dreams and tragic pasts. Together, they navigate the Grand Line's dangerous waters, facing powerful enemies, corrupt governments, and other pirate crews while forming unbreakable bonds of friendship. In a world where pirates rule the seas and the World Government maintains order through force, Luffy's unwavering determination to achieve absolute freedom drives him toward the ultimate adventure that will determine the fate of the pirate era.",
				Format:       "TV",
				Status:       "CURRENTLY_AIRING",
				Episodes:     nil,
				Duration:     utils.IntPtr(24),
				Season:       "FALL",
				SeasonYear:   utils.IntPtr(1999),
				AgeRating:    "PG-13",
				IsAdult:      false,
			},
			genres: []entities.Genre{action, adventure, comedy, drama, fantasy},
			studioName: "Toei Animation",
		},
	}

	for _, item := range animeList {
		item.anime.StudioId = findStudio(item.studioName)

		// Create the anime
		if err := db.Create(&item.anime).Error; err != nil {
			return err
		}

		// Associate genres
		if len(item.genres) > 0 {
			if err := db.Model(&item.anime).Association("Genres").Append(item.genres); err != nil {
				return err
			}
		}

	}

	log.Printf("✅ Seeded %d anime entries\n", len(animeList))
	return nil
}


