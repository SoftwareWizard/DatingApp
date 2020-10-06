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
export class NavComponent implements OnInit, OnDestroy {
   model: any = { username: 'john', password: 'password' };
   user$: Observable<User>;
   loggedIn$: Observable<boolean>;
   sub: Subscription;

   constructor(private accountService: AccountService) {}

   ngOnInit(): void {
      this.user$ = this.accountService.currentUser$;
      this.loggedIn$ = this.user$.pipe(map(user => !!user));
   }

   ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

   login(): void {
      this.sub = this.accountService.login(this.model).subscribe();
   }

   logout(): void {
      this.accountService.logout();
   }
}
