using System.Threading.Tasks;
using DatingApp.API.Interfaces;
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

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(item => item.UserName == username);
        }
    }
}
