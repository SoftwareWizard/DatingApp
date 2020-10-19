import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectMemberAll, selectMemberTotal } from './members.entity';
import { Member } from '../../models/member';
import { memberFeatureKey, MemberState } from '../member.state';

const selectMemberState = createFeatureSelector<MemberState>(memberFeatureKey);
export const selectMembersState = createSelector(selectMemberState, state => state.members);

export const allMembers = createSelector(selectMembersState, selectMemberAll);
export const numOfMembers = createSelector(selectMembersState, selectMemberTotal);
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

export const totalItems = createSelector(filteredMembers, members => members.length);
export const currentPage = createSelector(selectMembersState, state => state.currentPage);
export const itemsPerPage = createSelector(selectMembersState, state => state.itemsPerPage);

export const paginatedMembers = createSelector(
   filteredMembers,
   totalItems,
   currentPage,
   itemsPerPage,
   (
      members: Member[],
      selectedTotalItems: number,
      selectedCurrentPage: number,
      selectedItemsPerPage
   ) => {
      const startIndex = (selectedCurrentPage - 1) * selectedItemsPerPage;
      let endIndex = startIndex + selectedItemsPerPage;
      if (endIndex >= selectedTotalItems) {
         endIndex = selectedTotalItems;
      }

      return members.slice(startIndex, endIndex);
   }
);
