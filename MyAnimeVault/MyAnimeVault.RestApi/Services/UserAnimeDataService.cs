﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MyAnimeVault.Domain.Models;
using MyAnimeVault.Domain.Models.DTOs;
using MyAnimeVault.EntityFramework;
using System.Xml.Linq;

namespace MyAnimeVault.RestApi.Services
{
    public class UserAnimeDataService : IUserAnimeDataService
    {
        private readonly MyAnimeVaultDbContext DbContext;

        public UserAnimeDataService(MyAnimeVaultDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public async Task<UserAnimeDTO?> AddAndReturnDTOAsync(UserAnimeDTO userAnimeDTO)
        {
            UserAnime? userAnimeToAdd = await DbContext.Animes.FirstOrDefaultAsync(ua => ua.Id == userAnimeDTO.Id);
            if (userAnimeToAdd == null)
            {
                userAnimeToAdd = new UserAnime
                {
                    AnimeId = userAnimeDTO.AnimeId,
                    Title = userAnimeDTO.Title,
                    MediaType = userAnimeDTO.MediaType,
                    Rating = userAnimeDTO.Rating,
                    NumEpisodesWatched = userAnimeDTO.NumEpisodesWatched,
                    TotalEpisodes = userAnimeDTO.TotalEpisodes,
                    WatchStatus = userAnimeDTO.WatchStatus,
                    Status = userAnimeDTO.Status,
                    Poster = userAnimeDTO.Poster != null ? new Poster
                    {
                        Id = userAnimeDTO.Poster.Id,
                        Large = userAnimeDTO.Poster.Large,
                        Medium = userAnimeDTO.Poster.Medium
                    } : null,
                    StartSeason = userAnimeDTO.StartSeason != null ? new StartSeason
                    {
                        Id = userAnimeDTO.StartSeason.Id,
                        Year = userAnimeDTO.StartSeason.Year,
                        Season = userAnimeDTO.StartSeason.Season
                    } : null
                };

                EntityEntry<UserAnime> createdResult = await DbContext.Set<UserAnime>().AddAsync(userAnimeToAdd);
                await DbContext.SaveChangesAsync();
                userAnimeDTO = MapToDTO(createdResult.Entity);
                return userAnimeDTO;
            }

            return null;
        }

        public async Task<UserAnime> AddAsync(UserAnime entity)
        {
            EntityEntry<UserAnime> createdResult = await DbContext.Set<UserAnime>().AddAsync(entity);
            await DbContext.SaveChangesAsync();
            return createdResult.Entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            UserAnime? entity = await DbContext.Set<UserAnime>().FirstOrDefaultAsync(e => e.Id == id);

            if (entity == null)
            {
                return false;
            }

            DbContext.Set<UserAnime>().Remove(entity);
            await DbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<UserAnimeDTO>?> GetAllAsDTOsAsync()
        {
            List<UserAnimeDTO> userAnimeDTOs = MapToListOfDTOs(await DbContext.Animes.Include(ua => ua.Poster).Include(ua => ua.StartSeason).ToListAsync());
            return userAnimeDTOs;
        }

        public async Task<List<UserAnime>?> GetAllAsync()
        {
            List<UserAnime>? userAnimes = await DbContext.Animes.Include(ua => ua.Poster).Include(ua => ua.StartSeason).ToListAsync();
            return userAnimes;
        }

        public async Task<UserAnimeDTO?> GetByIdAsDTOAsync(int id)
        {
            UserAnime? userAnime = await DbContext.Animes.Include(ua => ua.Poster).Include(ua => ua.StartSeason).FirstOrDefaultAsync(u => u.Id == id);
            if (userAnime != null)
            {
                UserAnimeDTO userAnimeDTO = MapToDTO(userAnime);
                return userAnimeDTO;
            }
            return null;
        }

        public async Task<UserAnime?> GetByIdAsync(int id)
        {
            UserAnime? user = await DbContext.Animes.Include(ua => ua.Poster).Include(ua => ua.StartSeason).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<UserAnimeDTO?> UpdateAndReturnDTOAsync(UserAnimeDTO userAnimeDTO)
        {
            UserAnime? userAnime = await DbContext.Animes.FirstOrDefaultAsync(u => u.Id == userAnimeDTO.Id);

            if (userAnime != null)
            {
                userAnime.Rating = userAnimeDTO.Rating;
                userAnime.NumEpisodesWatched = userAnimeDTO.NumEpisodesWatched;
                userAnime.TotalEpisodes = userAnimeDTO.TotalEpisodes;
                userAnime.WatchStatus = userAnimeDTO.WatchStatus;
                userAnime.Status = userAnimeDTO.Status;

                EntityEntry<UserAnime> result = DbContext.Set<UserAnime>().Update(userAnime);
                await DbContext.SaveChangesAsync();
                userAnimeDTO = MapToDTO(result.Entity);
                return userAnimeDTO;
            }

            return null;
        }

        public async Task<UserAnime> UpdateAsync(UserAnime entity)
        {
            EntityEntry<UserAnime> result = DbContext.Set<UserAnime>().Update(entity);
            await DbContext.SaveChangesAsync();
            return result.Entity;
        }

        //Map to DTO method
        private UserAnimeDTO MapToDTO(UserAnime userEntity)
        {
            return new UserAnimeDTO
            {
                Id = userEntity.Id,
                AnimeId = userEntity.AnimeId,
                Title = userEntity.Title,
                MediaType = userEntity.MediaType,
                Rating = userEntity.Rating,
                NumEpisodesWatched = userEntity.NumEpisodesWatched,
                TotalEpisodes = userEntity.TotalEpisodes,
                WatchStatus = userEntity.WatchStatus,
                Status = userEntity.Status,
                Poster = userEntity.Poster != null ? new PosterDTO
                {
                    Id = userEntity.Poster.Id,
                    Large = userEntity.Poster.Large,
                    Medium = userEntity.Poster.Medium
                } : null,
                StartSeason = userEntity.StartSeason != null ? new StartSeasonDTO
                {
                    Id = userEntity.StartSeason.Id,
                    Year = userEntity.StartSeason.Year,
                    Season = userEntity.StartSeason.Season
                } : null
            };
        }

        private List<UserAnimeDTO> MapToListOfDTOs(List<UserAnime> userAnimes)
        {
            List<UserAnimeDTO> userAnimeDTOs = userAnimes.Select(ua => new UserAnimeDTO
            {
                Id = ua.Id,
                AnimeId = ua.AnimeId,
                Title = ua.Title,
                MediaType = ua.MediaType,
                Rating = ua.Rating,
                NumEpisodesWatched = ua.NumEpisodesWatched,
                TotalEpisodes = ua.TotalEpisodes,
                WatchStatus = ua.WatchStatus,
                Status = ua.Status,
                Poster = ua.Poster != null ? new PosterDTO
                {
                    Id = ua.Poster.Id,
                    Large = ua.Poster.Large,
                    Medium = ua.Poster.Medium
                } : null,
                StartSeason = ua.StartSeason != null ? new StartSeasonDTO
                {
                    Id = ua.StartSeason.Id,
                    Year = ua.StartSeason.Year,
                    Season = ua.StartSeason.Season
                } : null
            }).ToList();

            return userAnimeDTOs;
        }
    }
}
