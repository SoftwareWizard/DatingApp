import { bindSelectors, createDuck, dispatch, getReducer, StoreFacade } from '@ngrx-ducks/core';
import { User } from 'src/app/modules/auth';
import { Message } from '../../models/message';
import { initialMessageThreadState, MessageThreadState } from './message-thread.state';
import * as messageThreadSelectors from './message-thread.selectors';

@StoreFacade()
export class MessageThreadFacade {
   select = bindSelectors(messageThreadSelectors);

   startMessageThreadHub = createDuck(
      '[Message Thread Page] Start Message Thread Hub',
      dispatch<{ user: User; otherUsername: string }>()
   );

   stopMessageThreadHub = createDuck(
      '[Message Thread Page] Stop Message Thread Hub',
      (state: MessageThreadState) => ({
         ...state,
         messages: [],
      })
   );

   updateMessages = createDuck(
      '[MessageThreadService] Update Messages',
      (state: MessageThreadState, payload: Message[]) => ({
         ...state,
         messages: payload,
      })
   );

   sendMessage = createDuck('[Message Thread Page] Send Message', dispatch<{ message: Message }>());
}

export const messageThreadReducer = getReducer(initialMessageThreadState, MessageThreadFacade);
