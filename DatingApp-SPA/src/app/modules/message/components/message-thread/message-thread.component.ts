import { PaginatedResult } from './../../../../core/models/pagination';
import { Message } from './../../models/message';
import { Component, Input, OnInit } from '@angular/core';
import { containerType, MessageService } from '../../services/message.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
   selector: 'app-message-thread',
   templateUrl: './message-thread.component.html',
   styleUrls: ['./message-thread.component.css'],
})
export class MessageThreadComponent implements OnInit {
   @Input() username: string;
   messageSendForm: FormGroup;
   messages: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

   constructor(private messageService: MessageService, private formBuilder: FormBuilder) {
      this.messageSendForm = this.formBuilder.group({
         messageText: ['bla'],
      });
   }

   async ngOnInit(): Promise<void> {
      await this.loadMessages();
   }

   async loadMessages(): Promise<void> {
      this.messages = await this.messageService.getMessageThread(this.username).toPromise();
   }

   isSender(message: Message): boolean {
      return message?.senderUsername === this.username;
   }

   isReceiver(message: Message): boolean {
      return message?.recipientUsername === this.username;
   }

   isMessageRead(message: Message): boolean {
      return message.readAt !== null;
   }

   async sendMessage(): Promise<void> {
      const messageTextControl = this.messageSendForm.get('messageText');
      await this.messageService.sendMessage(this.username, messageTextControl.value).toPromise();
      messageTextControl.reset();
      this.loadMessages();
   }
}
