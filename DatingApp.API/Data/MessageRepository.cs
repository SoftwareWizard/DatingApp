using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Helpers;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<MessageDto>> GetMessageForUser(int userId)
        {
            var query = _context.Messages
            .Where(item => item.SenderId == userId || item.RecipientId == userId)
            .OrderBy(m => m.SentAt)
            .AsQueryable();

            var messages = await query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider).ToListAsync();
            return messages;
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