import { LikesState, initialLikesState } from './likes/likes.entity';
import { MembersState, initialMembersState } from './members/members.entity';

export const memberFeatureKey = 'member';

export interface MemberState {
   members: MembersState;
   likes: LikesState;
}

export const initialMemberState = { members: initialMembersState, likes: initialLikesState };
