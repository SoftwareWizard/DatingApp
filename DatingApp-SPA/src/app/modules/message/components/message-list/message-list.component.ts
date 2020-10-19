import { Observable } from 'rxjs';
import { PaginatedResult } from './../../../../core/models/pagination';
import { AppRouteNames } from 'src/app/app-routing.names';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { ContainerType } from '../../models/container.type';
import { MessageFacade } from '../../ngrx/message.facade';

@Component({
   selector: 'app-message-list',
   templateUrl: './message-list.component.html',
   styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
   ROUTES = AppRouteNames;

   messages: PaginatedResult<Message[]>;
   messages$: Observable<Message[]>;

   container: ContainerType = ContainerType.outbox;

   constructor(
      private messageFacade: MessageFacade
     ) {}

   async ngOnInit(): Promise<void> {
    this.messages$ = this.messageFacade.getAll();
    // await this.loadMessages();
   }

   async loadMessages(): Promise<void> {

      // FIXME: this.messages = await this.messageService.getMessages(this.container).toPromise();
   }

   async deleteMessage(id: number): Promise<void> {
      // FIXME: await this.messageService.deleteMessage(id).toPromise();
      // await this.loadMessages();
   }

   get ContainerType(): typeof ContainerType {
      return ContainerType;
   }
}
