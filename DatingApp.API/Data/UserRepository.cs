using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

        public async Task<PagedList<MemberDto>> GetUsersAsync(UserParams userParams)
        {
            var query = _context.Users
                .Include(item => item.Photos)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            return await PagedList<MemberDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
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

        public void DeletePhoto(User user, in Photo photo)
        {
            user.Photos.Remove(photo);
        }
    }
}