import { MembersState, initialMembersState } from './members.entity';

export const memberFeatureKey = 'member';

export interface MemberState {
   members: MembersState;
   likes: any;
}

export const initialMemberState = { members: initialMembersState, likes: null };
