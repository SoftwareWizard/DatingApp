import { Member } from '../models/member';

export const membersFeatureKey = 'members';

export interface MembersState {
   members: Member[];
}

export const initialMembersState: MembersState = {
   members: [],
};
