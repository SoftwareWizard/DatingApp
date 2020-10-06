import { AccountService } from './../services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { User } from '../models/user';
import { map, tap } from 'rxjs/operators';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
   model: any = { username: 'john', password: 'password' };
   user$: Observable<User>;
   loggedIn$: Observable<boolean>;

   constructor(private accountService: AccountService) {}

   ngOnInit(): void {
      this.user$ = this.accountService.currentUser$;
      this.loggedIn$ = this.user$.pipe(map(user => !!user));
   }

   async login(): Promise<void> {
      try {
         await this.accountService.login(this.model);
      } catch (error) {
         console.log(error);
      }
   }

   logout(): void {
      this.accountService.logout();
   }
}
