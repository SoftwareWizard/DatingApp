using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Interfaces
{
    public interface IUserRepository
    {
        public void Update(User user);

        public Task<bool> SaveAllAsync();

        public Task<IEnumerable<User>> GetUsersAsync();

        public Task<User> GetUserById(int id);

        public Task<User> GetUserByUsernameAsync(string username);
        public void DeletePhoto(User user, in Photo photo);
    }
}
