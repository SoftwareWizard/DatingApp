using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Helpers;

namespace DatingApp.API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);

        Task<IEnumerable<MessageDto>> GetMessageForUser(int userId);

        Task<PagedList<MessageDto>> GetMessageThread(string senderUsername, string recipientUsername);

        Task<bool> SaveAllAsync();
    }
}
