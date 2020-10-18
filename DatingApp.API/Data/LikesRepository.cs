using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingApp.API.Dtos;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Dtos;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public LikesRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<User> GetUserWithLikes(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(item => item.Id == userId);
        }

        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            var users = _context.Users.OrderBy(u => u.Username).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == userId);
                users = likes.Select(like => like.LikedUser);
            }

            if (predicate == "likedBy")
            {
                likes = likes.Where(like => like.LikedUserId == userId);
                users = likes.Select(like => like.SourceUser);
            }

            return await users.Select(item => new LikeDto
            {
                Id = item.Id,
                Username = item.Username,
                Age = item.Age,
                KnownAs = item.KnownAs,
                City = item.City,
                PhotoUrl = item.Photos.SingleOrDefault(photo => photo.IsMain).Url
            }).ToListAsync();
        }
        public async Task<IEnumerable<UserLikeDto>> GetUserLikes(int userId)
        {
            var users = _context.Users.OrderBy(u => u.Username).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            likes = likes.Where(like => like.SourceUserId == userId || like.LikedUserId == userId);
            return await likes.ProjectTo<UserLikeDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task AddUserLike(int sourceUserId, int id)
        {
            var userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = id
            };

            _context.Likes.Add(userLike);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveUserLike(int sourceUserId, int id)
        {
            var userLike = _context.Likes.Single(item => item.SourceUserId == sourceUserId && item.LikedUserId == id);
            _context.Likes.Remove(userLike);
            await _context.SaveChangesAsync();
        }
    }
}
