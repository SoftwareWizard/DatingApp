using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Interfaces
{
    public interface IAuthRepository
    {
        public Task<bool> UserExists(string username);
    }
}
