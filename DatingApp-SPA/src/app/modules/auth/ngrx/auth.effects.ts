import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class AuthEffects {
   constructor(private actions$: Actions, private accountService: AccountService) {}

   navbarLogin$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(AuthActions.navbarLogin),
         exhaustMap(action =>
            this.accountService.login(action.loginModel).pipe(
               map(user => AuthActions.loginSuccess({ user })),
               catchError(error => of(AuthActions.loginFailed({ error })))
            )
         )
      );
   });

   loginSuccess$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(action => console.log(action.user))
         );
      },
      { dispatch: false }
   );

   loginFailed$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.loginFailed),
            tap(error => console.log(error))
         );
      },
      { dispatch: false }
   );

   navbarLogout$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.navbarLogout),
            tap(() => console.log('navbar logout effect'))
         );
      },
      { dispatch: false }
   );
}
