using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Interfaces
{
    public interface IAuthRepository
    {
        public Task<AppUser> Register(AppUser user, string password);

        public Task<AppUser> Login(string username, string password);

        public Task<bool> UserExists(string username);
    }
}
