import { dispatch } from '@ngrx-ducks/core';
import { AuthFacade } from './../../modules/auth/ngrx/auth.facade';

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/auth';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
   title = 'DatingApp-SPA';

   constructor(private authFacade: AuthFacade) {}

   ngOnInit(): void {
      this.tryLogin();
   }

   tryLogin(): void {
      // FIXME: this.authFacade.appLogin.dispatch();
   }
}
