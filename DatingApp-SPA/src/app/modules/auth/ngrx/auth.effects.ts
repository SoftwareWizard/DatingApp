import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';

@Injectable({
   providedIn: 'root',
})
export class AuthEffects {
   constructor(
      private actions$: Actions,
      private authStore: Store<AuthState>,
      private accountService: AccountService
   ) {}

   navbarLogin$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.navbarLogin),
            tap(action => {
               console.log(action);
               this.accountService.login(action.loginModel).subscribe(
                  user => {
                     this.authStore.dispatch(AuthActions.loginSuccess({ user }));
                  },
                  error => {
                     this.authStore.dispatch(AuthActions.loginFailed({ error }));
                  }
               );
            })
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

   loginFailure$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.loginFailed),
            tap(error => console.log(error))
         );
      },
      { dispatch: false }
   );

   //  effectName$ = createEffect(() => {
   //    return this.actions$.pipe(
   //        ofType(FeatureActions.action),
   //        tap(() =>
   //          apiSource.pipe(
   //            map(data => FeatureActions.actionSuccess({ data })),
   //            catchError(error => of(FeatureActions.actionFailure({ error }))))
   //          ),
   //    );
   //  });
}
