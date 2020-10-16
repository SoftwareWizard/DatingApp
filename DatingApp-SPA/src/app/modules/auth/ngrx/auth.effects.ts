import { AppRouteNames } from './../../../app-routing.names';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorageService } from 'src/app/core';

@Injectable({
   providedIn: 'root',
})
export class AuthEffects {
   ROUTES = AppRouteNames;
   MSG_SUCCESS = 'Success';
   MSG_ERROR = 'Error';
   MSG_TITLE_LOGIN = 'LOGIN';
   MSG_TITLE_REGISTER = 'REGISTRATION';

   constructor(
      private actions$: Actions,
      private toastr: ToastrService,
      private accountService: AccountService,
      private router: Router,
      private localStorageService: LocalStorageService
   ) {}

   navbarLogin$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(AuthActions.navbarLogin),
         exhaustMap(action =>
            this.accountService.login(action.loginModel).pipe(
               map(user => AuthActions.loginSuccess({ user })),
               catchError(error => of(AuthActions.loginFailure({ error })))
            )
         )
      );
   });

   loginSuccess$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(action => {
               this.toastr.success(this.MSG_SUCCESS, this.MSG_TITLE_LOGIN);
               this.router.navigateByUrl(`${this.ROUTES.MEMBERS}`);
               this.localStorageService.setUser(action.user);
            })
         );
      },
      { dispatch: false }
   );

   loginFailure$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.loginFailure),
            tap(_ => this.toastr.error(this.MSG_ERROR, this.MSG_TITLE_LOGIN))
         );
      },
      { dispatch: false }
   );

   registerPageRegisterUser$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(AuthActions.register),
         exhaustMap(action =>
            this.accountService.register(action.registerModel).pipe(
               map(user => AuthActions.registerSuccess()),
               catchError(error => of(AuthActions.registerFailure({ error })))
            )
         )
      );
   });

   registerSuccess$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.registerSuccess),
            tap(_ => {
               this.toastr.success(this.MSG_SUCCESS, this.MSG_TITLE_REGISTER);
               this.router.navigateByUrl('/');
            })
         );
      },
      { dispatch: false }
   );

   registerFailure$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.registerFailure),
            tap(_ => this.toastr.error(this.MSG_ERROR, this.MSG_TITLE_REGISTER))
         );
      },
      { dispatch: false }
   );

   navbarLogout$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(AuthActions.navbarLogout),
            tap(() => {
               this.localStorageService.removeUser();
               this.router.navigateByUrl('/');
            })
         );
      },
      { dispatch: false }
   );
}
