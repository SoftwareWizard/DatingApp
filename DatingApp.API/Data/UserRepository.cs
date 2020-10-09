using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public void Update(User user)
        {
            _context.Entry(user)
                .State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            if (_context.ChangeTracker.HasChanges())
            {
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context
                .Users
                .Include(item => item.Photos)
                .ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context
                .Users
                .Include(item => item.Photos)
                .SingleOrDefaultAsync(item => item.Id == id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context
                .Users
                .Include(item => item.Photos)
                .SingleOrDefaultAsync(item => item.Username == username);
        }
    }
}