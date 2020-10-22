import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../../auth';
import { Message } from '../models/message';
import { MessageThreadFacade } from '../ngrx/message-thread/message-thread.facade';

@Injectable({
   providedIn: 'root',
})
export class MessageThreadService {
   hubUrl = environment.hubUrl;
   private hubConnection: HubConnection;

   constructor(private messageThreadFacade: MessageThreadFacade) {}

   createHubConnection(user: User, otherUsername: string): void {
      this.hubConnection = new HubConnectionBuilder()
         .withUrl(`${this.hubUrl}/message?user=${otherUsername}`, {
            accessTokenFactory: () => user.token,
         })
         .withAutomaticReconnect()
         .build();

      this.hubConnection.start().catch(error => console.log(error));
      this.hubConnection.on('ReceiveMessageThread', (messages: Message[]) => {
         this.messageThreadFacade.updateMessages.dispatch(messages);
      });
   }

   stopHubConnection(): void {
      if (this.hubConnection) {
         this.hubConnection.stop();
      }
   }

   sendMessage(message: Message): void {
      this.hubConnection.send('SendMessage', message);
   }
}
