using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Dtos;

namespace DatingApp.API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);

        Task<User> GetUserWithLikes(int userId);

        Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId);

        Task<IEnumerable<UserLikeDto>> GetUserLikes(int userId);
        Task AddUserLike(int sourceUserId, int id);
        Task RemoveUserLike(int sourceUserId, int id);
    }
}