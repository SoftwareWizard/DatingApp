import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { LikesState, initialLikesState } from './likes/likes.entity';
import { MembersState, initialMembersState } from './members/members.entity';
import { OnlineState } from './online/online.state';

export const memberFeatureKey = 'member';

export interface MemberState {
   members: MembersState;
   likes: LikesState;
   online: OnlineState;
}

export const initialMemberState = { members: initialMembersState, likes: initialLikesState };
export const metaReducers: MetaReducer<MemberState>[] = !environment.production ? [] : [];
