﻿using System.ComponentModel.DataAnnotations;

namespace MyAnimeVault.Models
{
    public class CreateAccountViewModel
    {
        public CreateAccountViewModel()
        {
            Email = string.Empty;
            DisplayName = string.Empty;
            Password = string.Empty;
            ConfirmPassword = string.Empty;
        }

        [Required(ErrorMessage = "Please enter an email address.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter a display name.")]
        public string DisplayName { get; set; }

        [Required(ErrorMessage = "Please enter a password.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please confirm your password.")]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
