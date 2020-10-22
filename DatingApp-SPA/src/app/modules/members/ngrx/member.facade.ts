import { ActionReducerMap } from '@ngrx/store';
import { MemberState, memberFeatureKey } from './member.state';
import { membersReducer } from './members/members.facade';
import { likesReducer } from './likes/likes.facade';
import { onlineReducer } from './online/online.facade';

export const featureKey = memberFeatureKey;

export const reducers: ActionReducerMap<MemberState> = {
   members: membersReducer,
   likes: likesReducer,
   online: onlineReducer
};
