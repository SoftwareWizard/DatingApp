import { AuthFacade } from './../../../modules/auth/ngrx/auth.facade';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRouteNames } from 'src/app/app-routing.names';
import { MembersRouteNames } from 'src/app/modules/members/members-routing.names';
import { LoginModel, User } from 'src/app/modules/auth';

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

   constructor(private authFacade: AuthFacade) {}

   ngOnInit(): void {
      this.loggedIn$ = this.authFacade.select.isLoggedIn;
      this.loggedOut$ = this.authFacade.select.isLoggedOut;
      this.user$ = this.authFacade.select.user;
   }

   login(): void {
      this.authFacade.navbarLogin.dispatch(this.loginModel);
   }

   logout(): void {
      this.authFacade.navbarLogout.dispatch();
   }
}
