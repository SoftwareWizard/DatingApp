import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
   ROUTES = AppRouteNames;
   MEMBERS_ROUTES = MembersRouteNames;

   loginModel: LoginModel = { username: 'lisa', password: 'Pa$$w0rd' };
   user$: Observable<User>;
   loggedIn$: Observable<boolean>;
   loggedOut$: Observable<boolean>;

   constructor(private authStore: Store<AuthState>) {}

   ngOnInit(): void {
      this.loggedIn$ = this.authStore.pipe(select(AuthSelectors.isLoggedIn));
      this.loggedOut$ = this.authStore.pipe(select(AuthSelectors.isLoggedOut));
      this.user$ = this.authStore.pipe(select(AuthSelectors.user));
   }

   login(): void {
      this.authStore.dispatch(AuthActions.navbarLogin({ loginModel: this.loginModel }));
   }

   logout(): void {
      this.authStore.dispatch(AuthActions.navbarLogout());
   }
}
