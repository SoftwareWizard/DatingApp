import { bindSelectors, createDuck, dispatch, getReducer, StoreFacade } from '@ngrx-ducks/core';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { MembersState, membersFeatureKey } from './members.state';
import * as membersSelectors from './members.selectors';
import { Member } from '../models/member';
import { adapter, initialMembersState } from './members.entity';
import { Update } from '@ngrx/entity';

@StoreFacade()
export class MembersFacade {
   select = bindSelectors(membersSelectors);

   loadMembers = createDuck(
      '[Member List] Load Members',
      dispatch<{ gender: 'male' | 'female' }>()
   );

   loadMembersSuccess = createDuck(
      '[Effect] Load Members Success',
      (state: MembersState, payload: Member[]) => adapter.setAll(payload, state)
   );

   updateMember = createDuck(
      '[Member List] Update Member',
      (state: MembersState, payload: Update<Member>) => adapter.updateOne(payload, state)
   );

   removeMember = createDuck(
      '[Member List] Remove Member',
      (state: MembersState, payload: string) => adapter.removeOne(payload, state)
   );

   loadMembersFailure = createDuck('[Effect] Load Members Failure', dispatch<{ error: any }>());

   changeFilter = createDuck(
      '[Member Filter] Change Filter',
      (state: MembersState, payload: { minAge?: number; maxAge?: number }) => ({
         ...state,
         minAge: payload.minAge,
         maxAge: payload.maxAge,
      })
   );

   changePagination = createDuck(
      '[Member Paginator] Change Pagination',
      (state: MembersState, payload: { itemsPerPage: number; currentPage: number }) => ({
         ...state,
         itemsPerPage: payload.itemsPerPage,
         currentPage: payload.currentPage,
      })
   );
}

export const featureKey = membersFeatureKey;
export const metaReducers: MetaReducer<MembersState>[] = !environment.production ? [] : [];
export const reducer = getReducer(initialMembersState, MembersFacade);
