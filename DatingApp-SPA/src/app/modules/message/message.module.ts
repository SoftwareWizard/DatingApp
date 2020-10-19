import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageThreadComponent } from './components/message-thread/message-thread.component';
import { EntityDefinitionService } from '@ngrx/data';
import { messageEntityMetadata } from './ngrx/message.entity-metadata';

@NgModule({
   declarations: [MessageListComponent, MessageThreadComponent],
   imports: [CommonModule, MessageRoutingModule, SharedModule],
   exports: [MessageRoutingModule, MessageListComponent, MessageThreadComponent],
   providers: [],
})
export class MessageModule {
   constructor(private eds: EntityDefinitionService) {
      eds.registerMetadataMap(messageEntityMetadata);
   }
}
