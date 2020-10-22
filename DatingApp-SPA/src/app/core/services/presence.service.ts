import { dispatch } from '@ngrx-ducks/core';
import { OnlineFacade } from './../../modules/members/ngrx/online/online.facade';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from 'src/app/modules/auth';

@Injectable({
   providedIn: 'root',
})
export class PresenceService {
   hubUrl = environment.hubUrl;
   private hubConnection: HubConnection;

   constructor(private toastr: ToastrService, private onlineFacade: OnlineFacade) {}

   createHubConnection(user: User): void {
      this.hubConnection = new HubConnectionBuilder()
         .withUrl(`${this.hubUrl}/presence`, {
            accessTokenFactory: () => user.token,
         })
         .withAutomaticReconnect()
         .build();

      this.hubConnection.start().catch(error => console.log(error));

      this.hubConnection.on('UserIsOnline', username => {
         this.toastr.info(`${username} has connected.`);
      });

      this.hubConnection.on('UserIsOffline', username => {
         this.toastr.info(`${username} has disconnected.`);
      });

      this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
         this.onlineFacade.updateOnlineUsers.dispatch(usernames);
      });
   }

   stopHubConnection(): void {
      this.hubConnection.stop().catch(error => console.log(error));
   }
}
