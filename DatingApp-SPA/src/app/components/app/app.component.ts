
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/auth';
// FIXME: import { AccountService, LOCAL_STORAGE_KEY_USER } from 'src/app/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
   title = 'DatingApp-SPA';
   user: User;

   constructor(
    // FIXME: private accountService: AccountService
     ) {}

   ngOnInit(): void {
      this.setCurrentUser();
   }

   setCurrentUser(): void {
      // FIXME: const user: User = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER));
      // if (user) {
      //    this.accountService.setCurrentUser(user);
      // }
   }
}
