import { PaginatedResult } from './../../../../core/models/pagination';
import { AppRouteNames } from 'src/app/app-routing.names';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { ContainerType } from '../../models/container.type';

@Component({
   selector: 'app-message-list',
   templateUrl: './message-list.component.html',
   styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
   ROUTES = AppRouteNames;

   messages: PaginatedResult<Message[]>;

   container: ContainerType = ContainerType.outbox;

   constructor(
    //  private messageService: MessageService
     ) {}

   async ngOnInit(): Promise<void> {
      await this.loadMessages();
   }

   async loadMessages(): Promise<void> {
      // FIXME: this.messages = await this.messageService.getMessages(this.container).toPromise();
   }

   async deleteMessage(id: number): Promise<void> {
      // FIXME: await this.messageService.deleteMessage(id).toPromise();
      await this.loadMessages();
   }

   get ContainerType(): typeof ContainerType {
      return ContainerType;
   }
}
