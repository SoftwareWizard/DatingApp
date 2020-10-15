import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';

import { AppRouteNames } from 'src/app/app-routing.names';
import { MembersRouteNames } from 'src/app/modules/members/members-routing.names';
import { AccountService } from 'src/app/modules/auth';

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
