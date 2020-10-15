import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppRouteNames } from 'src/app/app-routing.names';
import { MembersRouteNames } from 'src/app/modules/members/members-routing.names';
import { AuthState, LoginModel, User } from 'src/app/modules/auth';
import { select, Store } from '@ngrx/store';
import * as AuthActions from 'src/app/modules/auth/ngrx/auth.actions';
import * as AuthSelectors from 'src/app/modules/auth/ngrx/auth.selectors';
@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
   MSG_SUCCESS = 'Success';
   MSG_ERROR = 'Error';
   MSG_TITLE = 'LOGIN';

   ROUTES = AppRouteNames;
   MEMBERS_ROUTES = MembersRouteNames;

   loginModel: LoginModel = { username: 'lisa', password: 'Pa$$w0rd' };
   user$: Observable<User>;
   loggedIn$: Observable<boolean>;
   loggedOut$: Observable<boolean>;

   constructor(
      private authStore: Store<AuthState>,
      private router: Router,
      private toastr: ToastrService
   ) {}

   ngOnInit(): void {
      this.loggedIn$ = this.authStore.pipe(select(AuthSelectors.isLoggedIn));
      this.loggedOut$ = this.authStore.pipe(select(AuthSelectors.isLoggedOut));
      this.user$ = this.authStore.pipe(select(AuthSelectors.user));
   }

   login(): void {
      this.authStore.dispatch(AuthActions.navbarLogin({ loginModel: this.loginModel }));
      // FIXME: add toaster for success
      // FIXME: route to members
      // try {
      //    await this.accountService.login(this.model);
      //    this.router.navigateByUrl(`/${this.ROUTES.MEMBERS}`);
      //    this.toastr.success(this.MSG_SUCCESS, this.MSG_TITLE);
      // } catch (error) {
      //    console.log(error);
      //    this.toastr.error(error.message, this.MSG_TITLE);
      // }
   }

   logout(): void {
      this.authStore.dispatch(AuthActions.navbarLogout());
      // this.accountService.logout();
      // this.router.navigateByUrl('/');
   }
}
