import { catchError, exhaustMap, map } from 'rxjs/operators';
import { MemberService } from './../services/member.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getActions } from '@ngrx-ducks/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { AppRouteNames } from 'src/app/app-routing.names';
import { MembersFacade } from './members.facade';
import { of } from 'rxjs';

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
         exhaustMap(action =>
            this.memberService.getMembers(1, 1000, 1, 99, action.payload.gender).pipe(
               map(data => actions.loadMembersSuccess(data)),
               catchError(error => of(actions.loadMembersFailure({ error })))
            )
         )
      );
   });
}
