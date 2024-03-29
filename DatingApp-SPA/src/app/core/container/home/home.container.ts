import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthFacade } from 'src/app/modules/auth';

@Component({
   templateUrl: './home.container.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContainerComponent implements OnInit {
   loggedIn$: Observable<boolean>;

   constructor(private authFacade: AuthFacade) {}

   ngOnInit(): void {
      this.loggedIn$ = this.authFacade.select?.isLoggedIn;
   }
}
