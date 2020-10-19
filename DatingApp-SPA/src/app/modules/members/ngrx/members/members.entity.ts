import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Member } from '../../models/member';

export interface MembersState extends EntityState<Member> {
   minAge: number;
   maxAge: number;
   currentPage: number;
   itemsPerPage: number;
}

export const membersAdapter = createEntityAdapter<Member>();

export const initialMembersState = {
   ...membersAdapter.getInitialState(),
   minAge: 18,
   maxAge: 90,
   itemsPerPage: 10,
   currentPage: 1,
};

export const {
   selectIds: selectMemberIds,
   selectEntities: selectMemberEntities,
   selectAll: selectMemberAll,
   selectTotal: selectMemberTotal,
} = membersAdapter.getSelectors();
