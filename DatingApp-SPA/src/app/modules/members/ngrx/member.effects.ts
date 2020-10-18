import { catchError, exhaustMap, map } from 'rxjs/operators';
import { MemberService } from '../services/member.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getActions } from '@ngrx-ducks/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { AppRouteNames } from 'src/app/app-routing.names';
import { MemberFacade } from './member.facade';
import { of } from 'rxjs';

const actions = getActions(MemberFacade);

@Injectable({
   providedIn: 'root',
})
export class MemberEffects {
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

   loadLikes$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(actions.loadLikes),
         exhaustMap(_ =>
            this.memberService.getAllLikeIds().pipe(
               map(data => actions.loadLikesSuccess(data)),
               catchError(error => of(actions.loadLikesFailure({ error })))
            )
         )
      );
   });

   setLike$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(actions.setLike),
         exhaustMap(({ payload }) =>
            this.memberService.addLikeId(payload.memberId).pipe(
               map(data => actions.setLikeSuccess(data)),
               catchError(error => of(actions.setLikeFailure({ error })))
            )
         )
      );
   });

   unsetLike$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(actions.unsetLike),
         exhaustMap(({ payload }) =>
            this.memberService.removeLikeId(payload.memberId).pipe(
               map(data => actions.unsetLikeSuccess(data)),
               catchError(error => of(actions.unsetLikeFailure({ error })))
            )
         )
      );
   });
}
