import { createEntityAdapter } from '@ngrx/entity';
import { Member } from '../models/member';

export const adapter = createEntityAdapter<Member>();

export const initialMembersState = { ...adapter.getInitialState(), minAge: 18, maxAge: 90 };

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
