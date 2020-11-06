
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel, User, AuthFacade } from 'src/app/modules/auth';

@Component({
   selector: 'app-nav-container',
   templateUrl: './nav.container.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavContainerComponent implements OnInit {
   user$: Observable<User>;
   loggedIn$: Observable<boolean>;
   loggedOut$: Observable<boolean>;

   constructor(private authFacade: AuthFacade) {}

   ngOnInit(): void {
      this.loggedIn$ = this.authFacade.select.isLoggedIn;
      this.loggedOut$ = this.authFacade.select.isLoggedOut;
      this.user$ = this.authFacade.select.user;
   }

   onLogin(loginModel: LoginModel): void {
      this.authFacade.navbarLogin.dispatch({
         username: loginModel.username,
         password: loginModel.password,
      });
   }

   onLogout(): void {
      this.authFacade.navbarLogout.dispatch();
   }
}
