import { bindSelectors, createDuck, dispatch, getReducer, StoreFacade } from '@ngrx-ducks/core';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { MemberState, memberFeatureKey } from './member.state';
import * as memberSelectors from './member.selectors';
import { Member } from '../models/member';
import { membersAdapter, initialMembersState } from './members.entity';
import { Update } from '@ngrx/entity';

@StoreFacade()
export class MemberFacade {
   select = bindSelectors(memberSelectors);

   loadMembers = createDuck(
      '[Member List] Load Members',
      dispatch<{ gender: 'male' | 'female' }>()
   );

   loadMembersSuccess = createDuck(
      '[Effect] Load Members Success',
      (state: MemberState, payload: Member[]) => membersAdapter.setAll(payload, state)
   );

   updateMember = createDuck(
      '[Member List] Update Member',
      (state: MemberState, payload: Update<Member>) => membersAdapter.updateOne(payload, state)
   );

   removeMember = createDuck(
      '[Member List] Remove Member',
      (state: MemberState, payload: string) => membersAdapter.removeOne(payload, state)
   );

   loadMembersFailure = createDuck('[Effect] Load Members Failure', dispatch<{ error: any }>());

   changeFilter = createDuck(
      '[Member Filter] Change Filter',
      (state: MemberState, payload: { minAge?: number; maxAge?: number }) => ({
         ...state,
         minAge: payload.minAge,
         maxAge: payload.maxAge,
      })
   );

   changePagination = createDuck(
      '[Member Paginator] Change Pagination',
      (state: MemberState, payload: { itemsPerPage: number; currentPage: number }) => ({
         ...state,
         itemsPerPage: payload.itemsPerPage,
         currentPage: payload.currentPage,
      })
   );
}

export const featureKey = memberFeatureKey;
export const metaReducers: MetaReducer<MemberState>[] = !environment.production ? [] : [];
export const reducer = getReducer(initialMembersState, MemberFacade);
