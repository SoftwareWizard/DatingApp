import { PaginatedResult } from './../../../../core/models/pagination';
import { AppRouteNames } from 'src/app/app-routing.names';
import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { containerType, MessageService } from '../../services/message.service';

@Component({
   selector: 'app-message-list',
   templateUrl: './message-list.component.html',
   styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
   ROUTES = AppRouteNames;

   messages: PaginatedResult<Message[]>;

   container: containerType = containerType.outbox;

   constructor(private messageService: MessageService) {}

   async ngOnInit(): Promise<void> {
      await this.loadMessages();
   }

   async loadMessages(): Promise<void> {
      this.messages = await this.messageService.getMembers(this.container).toPromise();
   }

   get ContainerType(): typeof containerType {
      return containerType;
   }
}
