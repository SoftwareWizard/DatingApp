import { bindSelectors, createDuck, dispatch, getReducer, StoreFacade } from '@ngrx-ducks/core';
import { Member } from '../models/member';
import * as membersSelectors from './members/members.selectors';
import { initialMembersState, membersAdapter } from './members/members.entity';
import { Update } from '@ngrx/entity';
import { MemberState } from './member.state';

@StoreFacade()
export class MembersFacade {
   select = bindSelectors(membersSelectors);

   loadMembers = createDuck(
      '[Member List] Load Members',
      dispatch<{ gender: 'male' | 'female' }>()
   );

   loadMembersSuccess = createDuck(
      '[Effect] Load Members Success',
      (state: MemberState, payload: Member[]) => ({
         ...state,
         members: membersAdapter.setAll(payload, state.members),
      })
   );

   updateMember = createDuck(
      '[Member List] Update Member',
      (state: MemberState, payload: Update<Member>) => ({
         ...state,
         members: membersAdapter.updateOne(payload, state.members),
      })
   );

   removeMember = createDuck(
      '[Member List] Remove Member',
      (state: MemberState, payload: string) => ({
         ...state,
         members: membersAdapter.removeOne(payload, state.members),
      })
   );

   loadMembersFailure = createDuck('[Effect] Load Members Failure', dispatch<{ error: any }>());

   changeFilter = createDuck(
      '[Member Filter] Change Filter',
      (state: MemberState, payload: { minAge?: number; maxAge?: number }) => ({
         ...state,
         members: {
            ...state.members,
            minAge: payload.minAge,
            maxAge: payload.maxAge,
         },
      })
   );

   changePagination = createDuck(
      '[Member Paginator] Change Pagination',
      (state: MemberState, payload: { itemsPerPage: number; currentPage: number }) => ({
         ...state,
         members: {
            ...state.members,
            itemsPerPage: payload.itemsPerPage,
            currentPage: payload.currentPage,
         },
      })
   );
}

export const membersReducer = getReducer(initialMembersState, MembersFacade);
