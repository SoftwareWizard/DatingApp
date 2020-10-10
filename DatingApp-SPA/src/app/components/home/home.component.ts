import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

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
}
