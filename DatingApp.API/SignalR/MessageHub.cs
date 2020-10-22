using System;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Extensions;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace SignalR
{
    public class MessageHub : Hub
    {
        private IMessageRepository _messageRepository;

        private readonly IUserRepository _userRepository;
        private IMapper _mapper;

        public MessageHub(IMessageRepository messageRepository, IMapper mapper, IUserRepository userRepository)
        {
            _messageRepository = messageRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"].ToString();
            var caller = Context.User.GetUsername();
            var groupName = GetGroupName(caller, otherUser);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var messages = await _messageRepository
                .GetMessageThread(Context.User.GetUsername(), otherUser);

            await Clients.Group(groupName).SendAsync("ReceiveMessageThread", messages);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(MessageDto createdMessageDto)
        {
            var username = Context.User.GetUsername();

            if (username == createdMessageDto.RecipientUsername)
                throw new HubException("You cannot send messages to yourself");

            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var recipient = await _userRepository.GetUserByUsernameAsync(createdMessageDto.RecipientUsername);

            if (recipient == null)
                throw new HubException("Recipient not found");

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createdMessageDto.Content
            };

            _messageRepository.AddMessage(message);
            await _messageRepository.SaveAllAsync();

            var messageDto = _mapper.Map<MessageDto>(message);

            var groupname = GetGroupName(sender.UserName, recipient.UserName);
            await Clients.Group(groupname).SendAsync("NewMessage", message);
        }

        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;

            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}