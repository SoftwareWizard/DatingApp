import { catchError, exhaustMap, map } from 'rxjs/operators';
import { MemberService } from '../../services/member.service';
import { Injectable } from '@angular/core';
import { getActions } from '@ngrx-ducks/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { LikesFacade } from './likes.facade';

const actions = getActions(LikesFacade);

@Injectable({
   providedIn: 'root',
})
export class LikesEffects {
   constructor(private actions$: Actions, private memberService: MemberService) {}

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
