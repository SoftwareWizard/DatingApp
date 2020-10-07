import { AccountService } from './../services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { AppRoutes } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
   ROUTES = AppRoutes;
   model: any = { username: 'john', password: 'password' };
   user$: Observable<User>;
   loggedIn$: Observable<boolean>;

   constructor(private accountService: AccountService, private router: Router) {}

   ngOnInit(): void {
      this.user$ = this.accountService.currentUser$;
      this.loggedIn$ = this.user$.pipe(map(user => !!user));
   }

   async login(): Promise<void> {
      try {
         await this.accountService.login(this.model);
         this.router.navigateByUrl(`/${this.ROUTES.MEMBERS}`);
      } catch (error) {
         console.log(error);
      }
   }

   logout(): void {
      this.accountService.logout();
      this.router.navigateByUrl('/');
   }
}
