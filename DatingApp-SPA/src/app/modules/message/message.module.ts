import { MessageThreadEffects } from './ngrx/messageThread/messageThread.effects';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageThreadComponent } from './components/message-thread/message-thread.component';
import { EntityDefinitionService, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import {
   defaultDataServiceConfig,
   messageEntityMetadata,
} from './ngrx/message/message.entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageFacade } from './ngrx/message/message.facade';
import * as messageThreadFacade from './ngrx/messageThread/messageThread.state';
import { messageThreadReducer } from './ngrx/messageThread/messageThread.facade';

@NgModule({
   declarations: [MessageListComponent, MessageThreadComponent],
   imports: [
      CommonModule,
      MessageRoutingModule,
      SharedModule,
      StoreModule.forFeature(messageThreadFacade.messageThreadFeatureKey, messageThreadReducer, {
         metaReducers: messageThreadFacade.metaReducers,
      }),
      EffectsModule.forFeature([MessageThreadEffects]),
   ],
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
