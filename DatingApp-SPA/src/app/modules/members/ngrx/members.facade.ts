import { bindSelectors, createDuck, dispatch, getReducer, StoreFacade } from '@ngrx-ducks/core';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { initialMembersState, MembersState, membersFeatureKey } from './members.state';
import * as membersSelectors from './members.selectors';
import { Member } from '../models/member';

@StoreFacade()
export class MembersFacade {
   select = bindSelectors(membersSelectors);

   loadMembers = createDuck('[Member List] Load Members', dispatch<{ gender: 'male' | 'female'}>());

   loadMembersSuccess = createDuck(
      '[Effect] Load Members Success',
      (state: MembersState, payload: Member[]) => ({ ...state, members: payload })
   );

   loadMembersFailure = createDuck('[Effect] Load Members Failure', dispatch<{ error: any }>());
}

export const featureKey = membersFeatureKey;
export const metaReducers: MetaReducer<MembersState>[] = !environment.production ? [] : [];
export const reducer = getReducer(initialMembersState, MembersFacade);
