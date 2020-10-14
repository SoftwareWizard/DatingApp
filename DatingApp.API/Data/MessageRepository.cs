using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Helpers;

namespace DatingApp.API.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessageForUser(MessageParams messageParams)
        {
            var query = _context.Messages
            .OrderBy(m => m.SentAt)
            .AsQueryable();

            query = messageParams.Container switch
            {
                "inbox" => query.Where(u => u.Recipient.Username == messageParams.Username),
                "outbox" => query.Where(u => u.Sender.Username == messageParams.Username),
                _ => query.Where(u => u.Recipient.Username == messageParams.Username && u.ReadAt == null)
            };

            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);
            var pagedMessages = await PagedList<MessageDto>.CreateAsync(messages, 1, 5);
            return pagedMessages;
        }

        public async Task<PagedList<MessageDto>> GetMessageThread(string senderUsername, string recipientUsername)
        {
            var query = _context.Messages
                .Where(m => m.RecipientUsername == recipientUsername && m.SenderUsername == senderUsername
                    || m.SenderUsername == recipientUsername && m.RecipientUsername == senderUsername)
                .OrderBy(m => m.SentAt)
                .AsQueryable();

            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);
            var pagedMessages = await PagedList<MessageDto>.CreateAsync(messages, 1, 100);
            return pagedMessages;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}