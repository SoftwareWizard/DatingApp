import { Message } from './../../models/message';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageFacade } from '../../ngrx/message.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
   selector: 'app-message-thread',
   templateUrl: './message-thread.component.html',
   styleUrls: ['./message-thread.component.css'],
})
export class MessageThreadComponent implements OnInit {
   @Input() username: string;
   messageTextControl: FormControl = new FormControl();
   messages$: Observable<Message[]>;

   constructor(private messageFacade: MessageFacade) {}

   ngOnInit(): void {
      this.messages$ = this.messageFacade.entities$.pipe(
         map(messages => messages.filter(item => item.recipientUsername === this.username))
      );
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

      this.messageFacade.add(message);
      this.messageTextControl.reset();
   }
}
