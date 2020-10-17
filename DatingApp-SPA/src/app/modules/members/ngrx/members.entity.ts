import { itemsPerPage, currentPage } from './members.selectors';
import { createEntityAdapter } from '@ngrx/entity';
import { Member } from '../models/member';

export const adapter = createEntityAdapter<Member>();

export const initialMembersState = { ...adapter.getInitialState(), minAge: 18, maxAge: 90, itemsPerPage: 10, currentPage: 1 };

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
