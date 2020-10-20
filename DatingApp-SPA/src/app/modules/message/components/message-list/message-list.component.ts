import { AuthFacade } from './../../../auth/ngrx/auth.facade';
import { Observable } from 'rxjs';
import { AppRouteNames } from 'src/app/app-routing.names';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { ContainerType } from '../../models/container.type';
import { MessageFacade } from '../../ngrx/message.facade';
import { map, take } from 'rxjs/operators';

@Component({
   selector: 'app-message-list',
   templateUrl: './message-list.component.html',
   styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
   ROUTES = AppRouteNames;
   messages$: Observable<Message[]>;
   container: ContainerType = ContainerType.unread;
   userId: number;

   constructor(private authFacade: AuthFacade, private messageFacade: MessageFacade) {}

   async ngOnInit(): Promise<void> {
      this.userId = await this.authFacade.select.user
         .pipe(
            map(user => user?.id),
            take(1)
         )
         .toPromise();

      this.messageFacade.getAll();
      this.messages$ = this.messageFacade.filteredEntities$;
      this.messageFacade.setFilter({ userId: this.userId, containerType: this.container });
   }

   async deleteMessage(id: number): Promise<void> {
      await this.messageFacade.delete(id).toPromise();
   }

   changeFilter(): void {
      this.messageFacade.setFilter({ userId: this.userId, containerType: this.container });
   }

   get ContainerType(): typeof ContainerType {
      return ContainerType;
   }
}
