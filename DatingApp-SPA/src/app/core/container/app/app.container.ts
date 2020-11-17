import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.container.html',
})
export class AppContainerComponent implements OnInit {
   title = 'DatingApp-SPA';

   constructor(
    //  private authFacade: AuthFacade
     ) {}

   ngOnInit(): void {
      this.tryLogin();
   }

   tryLogin(): void {
      // FIXME: this.authFacade.appLogin.dispatch();
   }
}
