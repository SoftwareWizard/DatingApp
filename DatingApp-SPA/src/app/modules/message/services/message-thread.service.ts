import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../../auth';
import { Message } from '../models/message';

@Injectable({
   providedIn: 'root',
})
export class MessageService {
   hubUrl = environment.hubUrl;
   private hubConnection: HubConnection;

   constructor() {}

   createHubConnection(user: User, otherUsername: string): void {
      this.hubConnection = new HubConnectionBuilder()
         .withUrl(`${this.hubUrl}message?user=${otherUsername}`, {
            accessTokenFactory: () => user.token,
         })
         .withAutomaticReconnect()
         .build();

      this.hubConnection.start().catch(error => console.log(error));
      this.hubConnection.on('ReceiveMessageThread', (messages: Message[]) => {
         // dispatch messages
         console.log(messages);
      });
   }

   stopHubConnection(): void {
      this.hubConnection.stop();
   }
}
