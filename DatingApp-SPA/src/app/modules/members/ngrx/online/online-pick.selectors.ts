import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memberFeatureKey, MemberState } from '../member.state';

const selectMemberState = createFeatureSelector<MemberState>(memberFeatureKey);
const onlineState = createSelector(selectMemberState, state => state.online);
const users = createSelector(onlineState, state => state.users);

export const isOnline = createSelector(
   users,
   (onlineUsers: string[], props: { username: string }) => {
      return onlineUsers.includes(props.username);
   }
);
