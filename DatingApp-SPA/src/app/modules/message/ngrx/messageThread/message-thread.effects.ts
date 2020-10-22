import { Injectable } from '@angular/core';
import { getActions } from '@ngrx-ducks/core';
import { Actions } from '@ngrx/effects';
import { MemberThreadFacade } from './message-thread.facade';

const actions = getActions(MemberThreadFacade);

@Injectable({
   providedIn: 'root',
})
export class MessageThreadEffects {
   constructor(private actions$: Actions) {}
}
