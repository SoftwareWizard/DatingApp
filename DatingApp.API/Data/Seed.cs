using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private const string FILE_PATH = "Data/UserSeedData.json";

        public static async Task SeedUsers(UserManager<AppUser> userManager)
        {
            
            var hasUsers = await userManager.Users.AnyAsync();

            if (hasUsers)
            {
                return;
            }

            var userData = await File.ReadAllTextAsync(FILE_PATH);
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {

                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
