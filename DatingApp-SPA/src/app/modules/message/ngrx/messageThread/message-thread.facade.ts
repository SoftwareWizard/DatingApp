import { bindSelectors, createDuck, getReducer, StoreFacade, usePick } from '@ngrx-ducks/core';
import { Message } from '../../models/message';
import { initialMessageThreadState, MessageThreadState } from './message-thread.state';

@StoreFacade()
export class MemberThreadFacade {
   pick = usePick();

   updateMessages = createDuck(
      '[MessageThreadService] Update Messages',
      (state: MessageThreadState, payload: Message[]) => ({
         ...state,
         messages: payload,
      })
   );
}

export const messageThreadReducer = getReducer(initialMessageThreadState, MemberThreadFacade);
