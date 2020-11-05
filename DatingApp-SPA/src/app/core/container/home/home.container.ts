import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthFacade } from 'src/app/modules/auth';

@Component({
   templateUrl: './home.container.html',
})
export class HomeContainerComponent implements OnInit {
   loggedIn$: Observable<boolean>;

   constructor(private authFacade: AuthFacade) {}

   ngOnInit(): void {
      this.loggedIn$ = this.authFacade.select?.isLoggedIn;
   }
}
