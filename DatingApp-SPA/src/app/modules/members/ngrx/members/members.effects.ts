import { catchError, exhaustMap, map } from 'rxjs/operators';
import { MemberService } from '../../services/member.service';
import { Injectable } from '@angular/core';
import { getActions } from '@ngrx-ducks/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppRouteNames } from 'src/app/app-routing.names';
import { of } from 'rxjs';
import { MembersFacade } from '../members.facade';

const actions = getActions(MembersFacade);

@Injectable({
   providedIn: 'root',
})
export class MembersEffects {
   ROUTES = AppRouteNames;

   constructor(private actions$: Actions, private memberService: MemberService) {}

   loadMembers$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(actions.loadMembers),
         exhaustMap(({ payload }) =>
            this.memberService.getMembers(1, 1000, 1, 99, payload.gender).pipe(
               map(data => actions.loadMembersSuccess(data)),
               catchError(error => of(actions.loadMembersFailure({ error })))
            )
         )
      );
   });
}
