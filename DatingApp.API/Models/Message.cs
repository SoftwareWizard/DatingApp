﻿using System;
using System.Collections.Generic;

namespace DatingApp.API.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }

        public string SenderUsername { get; set; }

        public User Sender { get; set; }

        public int RecipientId { get; set; }

        public string RecipientUsername { get; set; }

        public User Recipient { get; set; }

        public string Content { get; set; }

        public DateTime? ReadAt { get; set; }

        public DateTime SentAt { get; set; } = DateTime.Now;

        public bool SenderDeleted { get; set; }

        public bool RecipientDeleted { get; set; }
    }
}