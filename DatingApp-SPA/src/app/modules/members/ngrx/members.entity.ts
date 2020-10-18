import { itemsPerPage, currentPage } from './member.selectors';
import { createEntityAdapter } from '@ngrx/entity';
import { Member } from '../models/member';

export const membersAdapter = createEntityAdapter<Member>();

export const initialMembersState = { ...membersAdapter.getInitialState(), minAge: 18, maxAge: 90, itemsPerPage: 10, currentPage: 1 };

export const { selectIds, selectEntities, selectAll, selectTotal } = membersAdapter.getSelectors();
