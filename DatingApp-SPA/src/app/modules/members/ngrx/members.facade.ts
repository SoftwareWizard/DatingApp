import { bindSelectors, getReducer, StoreFacade } from '@ngrx-ducks/core';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { initialMembersState, MembersState, membersFeatureKey } from './members.state';
import * as membersSelectors from './members.selectors';

@StoreFacade()
export class MembersFacade {
   select = bindSelectors(membersSelectors);
}

export const featureKey = membersFeatureKey;
export const metaReducers: MetaReducer<MembersState>[] = !environment.production ? [] : [];
export const reducer = getReducer(initialMembersState, MembersFacade);
