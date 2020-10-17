import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, selectTotal } from './members.entity';
import { membersFeatureKey, MembersState } from './members.state';
import { Member } from '../models/member';

export const selectMembersState = createFeatureSelector<MembersState>(membersFeatureKey);
export const allMembers = createSelector(selectMembersState, selectAll);
export const numOfMembers = createSelector(selectMembersState, selectTotal);
export const minAge = createSelector(selectMembersState, state => state.minAge);
export const maxAge = createSelector(selectMembersState, state => state.maxAge);

export const filteredMembers = createSelector(
   allMembers,
   minAge,
   maxAge,
   (members: Member[], filterMinAge: number, filterMaxAge: number) => {
      return members.filter(
         (member: Member) => member.age >= filterMinAge && member.age <= filterMaxAge
      );
   }
);
