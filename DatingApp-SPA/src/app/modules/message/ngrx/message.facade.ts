import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';

@Injectable()
export class MessageFacade extends EntityCollectionServiceBase<Message> {
   baseUrl = environment.apiUrl;
   constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('Message', serviceElementsFactory);
   }
}
