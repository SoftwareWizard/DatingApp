import { likesReducer } from './likes.facade';
import { ActionReducerMap } from '@ngrx/store';
import { MemberState, memberFeatureKey } from './member.state';
import { membersReducer } from './members.facade';


export const featureKey = memberFeatureKey;

export const reducers: ActionReducerMap<MemberState> = {
   members: membersReducer,
   likes: likesReducer
};
