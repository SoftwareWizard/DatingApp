import { createDuck, getReducer, StoreFacade, usePick } from '@ngrx-ducks/core';
import { initialOnlineState, OnlineState } from './online.state';

@StoreFacade()
export class OnlineFacade {
   pick = usePick();

   updateOnlineUsers = createDuck(
      '[PresenceService] Update Online Users',
      (state: OnlineState, payload: string[]) => ({
         ...state,
         users: payload,
      })
   );
}

export const onlineReducer = getReducer(initialOnlineState, OnlineFacade);
export * from './online-pick.selectors';
