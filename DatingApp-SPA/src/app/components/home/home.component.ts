import { AuthRouteEnum } from './../../modules/auth/auth-routing.names';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/core';

import { AppRouteNames } from 'src/app/app-routing.names';
import { AuthRouteNames } from 'src/app/modules/auth';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
   registerMode = false;
   loggedIn$: Observable<boolean>;

   constructor(private accountService: AccountService) {}

   ngOnInit(): void {
      this.loggedIn$ = this.accountService.currentUser$.pipe(map(user => !!user));
   }

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
