import {
   bindSelectors,
   createDuck,
   dispatch,
   getReducer,
   StoreFacade,
   usePick,
} from '@ngrx-ducks/core';
import { createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { MemberState, memberFeatureKey, initialMemberState } from './member.state';
import * as memberSelectors from './member.selectors';
import { Member } from '../models/member';
import { membersAdapter } from './members.entity';
import { Update } from '@ngrx/entity';
import { Like } from '../models/like';
import { likesAdapter } from './likes.entity';
import { USER_PROVIDED_EFFECTS } from '@ngrx/effects';

@StoreFacade()
export class MemberFacade {
   select = bindSelectors(memberSelectors);
   pick = usePick();

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

   loadLikes = createDuck('[Member List Page] Load Likes');

   loadLikesSuccess = createDuck(
      '[Effect] Load Likes Success',
      (state: MemberState, payload: Like[]) => ({
         ...state,
         likes: likesAdapter.setAll(payload, state.likes),
      })
   );

   loadLikesFailure = createDuck('[Effect] Load Likes Failure', dispatch<{ error: any }>());

   setLike = createDuck('[Member Card] Set Like', dispatch<{ userId: number; memberId: number }>());

   setLikeSuccess = createDuck(
      '[Effect] Set Like Success',
      (state: MemberState, payload: Like[]) => ({
         ...state,
         likes: likesAdapter.setAll(payload, state.likes),
      })
   );

   setLikeFailure = createDuck('[Effect] Set Like Failure', dispatch<{ error: any }>());

   unsetLike = createDuck(
      '[Member Card] Unset Like',
      dispatch<{ userId: number; memberId: number }>()
   );

   unsetLikeSuccess = createDuck(
      '[Effect] UnsSet Like Success',
      (state: MemberState, payload: Like[]) => ({
         ...state,
         likes: likesAdapter.setAll(payload, state.likes),
      })
   );

   unsetLikeFailure = createDuck('[Effect] Unset Like Failure', dispatch<{ error: any }>());
}

export const featureKey = memberFeatureKey;
export const metaReducers: MetaReducer<MemberState>[] = !environment.production ? [] : [];
export const reducer = getReducer(initialMemberState, MemberFacade);

export const isLike = createSelector(
   memberSelectors.allLikeIds,
   (likes: string[], props: { userId: number; memberId: number }) => {
      const key = `${props.userId}-${props.memberId}`;
      return likes.includes(key);
   }
);
