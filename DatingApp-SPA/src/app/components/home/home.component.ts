import { AuthFacade } from './../../modules/auth/ngrx/auth.facade';
import { AuthRouteEnum } from './../../modules/auth/auth-routing.names';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppRouteNames } from 'src/app/app-routing.names';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
   registerMode = false;
   loggedIn$: Observable<boolean>;

   constructor(private authFacade: AuthFacade) {
      this.loggedIn$ = this.authFacade.select.isLoggedIn;
   }

   ngOnInit(): void {}

   onRegisterToggle(): void {
      this.registerMode = !this.registerMode;
   }

   onCancelRegister(): void {
      this.registerMode = false;
   }

   get AUTH_ROUTES(): typeof AuthRouteEnum {
      return AuthRouteEnum;
   }

   get ROUTES(): AppRouteNames {
      return AppRouteNames;
   }
}
