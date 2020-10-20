using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Interfaces
{
    public interface IUserRepository
    {
        public void Update(AppUser user);

        public Task<bool> SaveAllAsync();

        public Task<PagedList<MemberDto>> GetUsersAsync(UserParams userParams);

        public Task<AppUser> GetUserById(int id);

        public Task<AppUser> GetUserByUsernameAsync(string username);
        public void DeletePhoto(AppUser user, in Photo photo);
    }
}
