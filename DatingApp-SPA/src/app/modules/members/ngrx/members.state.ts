import { EntityState } from '@ngrx/entity/src';
import { Member } from '../models/member';

export const membersFeatureKey = 'members';

export interface MembersState extends EntityState<Member> {
   minAge: number;
   maxAge: number;
   currentPage: number;
   itemsPerPage: number;
}
