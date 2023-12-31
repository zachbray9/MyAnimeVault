﻿namespace MyAnimeVault.Domain.Models.DTOs
{
    public class UserAnimeDTO
    {
        public int Id { get; set; }
        public int AnimeId { get; set; }
        public string Title { get; set; } = null!;
        public string MediaType { get; set; } = null!;
        public int Rating { get; set; } = 0;
        public int NumEpisodesWatched { get; set; } = 0;
        public int TotalEpisodes { get; set; }
        public string WatchStatus { get; set; } = "watching";
        public string Status { get; set; } = null!;
        public PosterDTO? Poster { get; set; }
        public StartSeasonDTO? StartSeason { get; set; }
    }
}
