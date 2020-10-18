import { EntityState } from '@ngrx/entity/src';
import { Member } from '../models/member';

export const memberFeatureKey = 'member';

export interface MemberState extends EntityState<Member> {
   minAge: number;
   maxAge: number;
   currentPage: number;
   itemsPerPage: number;
}
