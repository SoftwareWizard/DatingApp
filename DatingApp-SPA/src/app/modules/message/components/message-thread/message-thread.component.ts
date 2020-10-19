import { PaginatedResult } from './../../../../core/models/pagination';
import { Message } from './../../models/message';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
   selector: 'app-message-thread',
   templateUrl: './message-thread.component.html',
   styleUrls: ['./message-thread.component.css'],
})
export class MessageThreadComponent implements OnInit {
   @Input() username: string;
   messageTextControl: FormControl = new FormControl();
   messages: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

   constructor(
    //  private messageService: MessageService
     ) {
   }

   async ngOnInit(): Promise<void> {
      await this.loadMessages();
   }

   async loadMessages(): Promise<void> {
      // FIXME: this.messages = await this.messageService.getMessageThread(this.username).toPromise();
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
      // FIXME: await this.messageService.sendMessage(this.username, this.messageTextControl.value).toPromise();
      this.messageTextControl.reset();
      this.loadMessages();
   }
}
