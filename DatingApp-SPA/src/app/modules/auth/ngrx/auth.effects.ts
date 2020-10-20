import { Injectable } from '@angular/core';
import { catchError, concatMap, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { AppRouteNames } from './../../../app-routing.names';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { LocalStorageService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../services/account.service';
import { getActions, dispatch } from '@ngrx-ducks/core';
import { AuthFacade } from './auth.facade';

const actions = getActions(AuthFacade);

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
      private localStorageService: LocalStorageService,
      private router: Router
   ) {}

   appLoginName$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(actions.appLogin),
         switchMap(_ => {
            const user = this.localStorageService.getUser();
            if (user) {
               this.router.navigateByUrl(`${this.ROUTES.MEMBERS}`);
               return of(actions.appLoginSuccess(user));
            } else {
               return of(actions.appLoginFailure());
            }
         })
      );
   });

   navbarLogin$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(actions.navbarLogin),
         exhaustMap(action =>
            this.accountService.login(action.payload).pipe(
               map(user => actions.loginSuccess(user)),
               catchError(error => of(actions.loginFailure(error)))
            )
         )
      );
   });

   loginSuccess$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(actions.loginSuccess),
            tap(action => {
               this.localStorageService.setUser(action.payload);
               this.router.navigateByUrl(`${this.ROUTES.MEMBERS}`);
               this.toastr.success(this.MSG_SUCCESS, this.MSG_TITLE_LOGIN);
            })
         );
      },
      { dispatch: false }
   );

   loginFailure$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(actions.loginFailure),
            tap(_ => this.toastr.error(this.MSG_ERROR, this.MSG_TITLE_LOGIN))
         );
      },
      { dispatch: false }
   );

   registerPageRegisterUser$ = createEffect(() => {
      return this.actions$.pipe(
         ofType(actions.register),
         exhaustMap(action =>
            this.accountService.register(action.payload).pipe(
               map(_ => actions.registerSuccess()),
               catchError(error => of(actions.registerFailure(error)))
            )
         )
      );
   });

   registerSuccess$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(actions.registerSuccess),
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
            ofType(actions.registerFailure),
            tap(_ => this.toastr.error(this.MSG_ERROR, this.MSG_TITLE_REGISTER))
         );
      },
      { dispatch: false }
   );

   navbarLogout$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(actions.navbarLogout),
            tap(() => {
               this.localStorageService.removeUser();
               this.router.navigateByUrl('/');
            })
         );
      },
      { dispatch: false }
   );
}
