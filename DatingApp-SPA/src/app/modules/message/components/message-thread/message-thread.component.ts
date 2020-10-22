import { AuthFacade } from './../../../auth/ngrx/auth.facade';
import { MessageThreadFacade } from './../../ngrx/message-thread/message-thread.facade';
import { Message } from './../../models/message';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
   selector: 'app-message-thread',
   templateUrl: './message-thread.component.html',
   styleUrls: ['./message-thread.component.css'],
})
export class MessageThreadComponent implements OnInit, OnDestroy {
   @Input() username: string;
   messageTextControl: FormControl = new FormControl();
   messages$: Observable<Message[]>;

   constructor(private authFacade: AuthFacade, private messageThreadFacade: MessageThreadFacade) {}

   async ngOnInit(): Promise<void> {
      const user = await this.authFacade.select.user.pipe(take(1)).toPromise();

      this.messageThreadFacade.startMessageThreadHub.dispatch({
         user,
         otherUsername: this.username,
      });

      this.messages$ = this.messageThreadFacade.select.messages;
   }

   ngOnDestroy(): void {
      this.messageThreadFacade.stopMessageThreadHub.dispatch();
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

      this.messageThreadFacade.sendMessage.dispatch({ message });
      this.messageTextControl.reset();
   }
}
