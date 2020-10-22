import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Message } from '../../models/message';

export const messageThreadFeatureKey = 'messageThread';

export interface MessageThreadState {
   messages: Message[];
}

export const initialMessageThreadState = { messages: [] };
export const metaReducers: MetaReducer<MessageThreadState>[] = !environment.production ? [] : [];
