import { selectLikeAll, selectLikeIds } from './likes.entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { memberFeatureKey, MemberState } from './member.state';

const selectMemberState = createFeatureSelector<MemberState>(memberFeatureKey);
export const selectLikesState = createSelector(selectMemberState, state => state.likes);
export const allLikes = createSelector(selectLikesState, selectLikeAll);
export const allLikeIds = createSelector(selectLikesState, selectLikeIds);
