import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthFacade } from 'src/app/modules/auth';

@Component({
   selector: 'app-home-container',
   templateUrl: './home.container.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainerComponent implements OnInit {
   loggedIn$: Observable<boolean>;
   value: string;

   constructor() //  private authFacade: AuthFacade
   {}

   ngOnInit(): void {
      // this.loggedIn$ = this.authFacade.select?.isLoggedIn;
   }

   show(value: string): void {
      this.value = value;
   }
}
