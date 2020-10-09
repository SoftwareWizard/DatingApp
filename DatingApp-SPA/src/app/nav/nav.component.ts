import { AppRouteNames } from './../app-routing.names';
import { AccountService } from './../services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
   model: any = { username: 'lisa', password: 'Pa$$w0rd' };
   user$: Observable<User>;
   loggedIn$: Observable<boolean>;

   constructor(
      private accountService: AccountService,
      private router: Router,
      private toastr: ToastrService
   ) {}

   ngOnInit(): void {
      this.user$ = this.accountService.currentUser$;
      this.loggedIn$ = this.user$.pipe(map(user => !!user));
   }

   async login(): Promise<void> {
      try {
         await this.accountService.login(this.model);
         this.router.navigateByUrl(`/${this.ROUTES.MEMBERS}`);
         this.toastr.success(this.MSG_SUCCESS, this.MSG_TITLE);
      } catch (error) {
         console.log(error);
         this.toastr.error(error.message, this.MSG_TITLE);
      }
   }

   logout(): void {
      this.accountService.logout();
      this.router.navigateByUrl('/');
   }
}
