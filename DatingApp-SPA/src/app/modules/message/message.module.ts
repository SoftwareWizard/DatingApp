import { MessageFacade } from './ngrx/message.facade';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageThreadComponent } from './components/message-thread/message-thread.component';
import { EntityDefinitionService, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { defaultDataServiceConfig, messageEntityMetadata } from './ngrx/message.entity-metadata';
import { MessageApiUrlGenerator } from './ngrx/message-api.url-generator';

@NgModule({
   declarations: [MessageListComponent, MessageThreadComponent],
   imports: [CommonModule, MessageRoutingModule, SharedModule],
   exports: [MessageRoutingModule, MessageListComponent, MessageThreadComponent],
   providers: [
      MessageFacade,
      { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
   ],
})
export class MessageModule {
   constructor(private eds: EntityDefinitionService) {
      eds.registerMetadataMap(messageEntityMetadata);
   }
}
