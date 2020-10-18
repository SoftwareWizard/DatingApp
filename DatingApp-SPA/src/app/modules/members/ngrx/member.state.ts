import { LikesState, initialLikesState } from './likes.entity';
import { MembersState, initialMembersState } from './members.entity';

export const memberFeatureKey = 'member';

export interface MemberState {
   members: MembersState;
   likes: LikesState;
}

export const initialMemberState = { members: initialMembersState, likes: initialLikesState };
