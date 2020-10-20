using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUser> Register(AppUser user, string password)
        {
            var (passwordHash, passwordSalt) = CreatePasswordHash(password);

            // FIXME: Set Password and Salt
            // FIXME: await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<AppUser> Login(string username, string password)
        {
            var user = await _context
                .Users
                .Include(item => item.Photos)
                .FirstOrDefaultAsync(item => item.UserName == username);

            if (user == null)
            {
                return null;
            }

            var isPasswordValid = true; // FIXME: VerifyPassword(password, user.PasswordHash, user.PasswordSalt);

            return isPasswordValid
                ? user
                : null;
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(item => item.UserName == username);
        }

        private (byte[] passwordHash, byte[] passwordSalt) CreatePasswordHash(string password)
        {
            using var hmac = new HMACSHA512();
            var passwordSalt = hmac.Key;
            var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return (passwordHash, passwordSalt);
        }

        private bool VerifyPassword(string password, byte[] userPasswordHash, byte[] userPasswordSalt)
        {
            using var hmac = new HMACSHA512(userPasswordSalt);
            var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return passwordHash
                .AsEnumerable()
                .SequenceEqual(userPasswordHash.AsEnumerable());
        }
    }
}
