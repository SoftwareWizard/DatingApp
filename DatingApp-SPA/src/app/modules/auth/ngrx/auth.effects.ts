import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, EffectConfig, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { of } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class AuthEffects {
   constructor(
      private actions$: Actions,
      private accountService: AccountService,
      private authStore: Store<AuthState>
   ) {}

   navbarLogin$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.navbarLogin),
            map(action =>
               this.accountService
                  .login(action.loginModel)
                  .pipe(
                     map(user => this.authStore.dispatch(AuthActions.loginSuccess({ user }))),
                     catchError(error => of(AuthActions.loginFailed({ error })))
                  )
                  .subscribe()
            )
         );
      },
      { dispatch: false }
   );

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
}
