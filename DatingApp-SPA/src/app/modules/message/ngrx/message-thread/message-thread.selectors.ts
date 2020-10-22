import { createFeatureSelector, createSelector } from '@ngrx/store';
import { messageThreadFeatureKey, MessageThreadState } from './message-thread.state';

const selectMessageThreadState = createFeatureSelector<MessageThreadState>(messageThreadFeatureKey);
export const messages = createSelector(selectMessageThreadState, state => state.messages);
