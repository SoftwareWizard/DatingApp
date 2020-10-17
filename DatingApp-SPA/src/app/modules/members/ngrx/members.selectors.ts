import { createFeatureSelector, createSelector } from '@ngrx/store';
import { membersFeatureKey, MembersState } from './members.state';

export const selectMembersState = createFeatureSelector<MembersState>(membersFeatureKey);
export const allMembers = createSelector(selectMembersState, state => state.members);
