import { Message } from './../../models/message';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-message-thread',
   templateUrl: './message-thread.component.html',
   styleUrls: ['./message-thread.component.css'],
})
export class MessageThreadComponent implements OnInit {
   @Input() username: string;
   messageTextControl: FormControl = new FormControl();
   messages$: Observable<Message[]>;

   constructor(
    //  FIXME: private messageThreadFacade: MessageThreadFacade
     ) {}

   ngOnInit(): void {
      // FIXME: this.messages$ = this.messageThreadFacade.select.messages;
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
      const content = this.messageTextControl.value;
      const message = {
         content,
         recipientUsername: this.username,
      } as Message;

      // FIXME: this.messageThreadFacade.send.dispatch(message);
      this.messageTextControl.reset();
   }
}
