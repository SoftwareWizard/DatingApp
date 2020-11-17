import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthRouteEnum } from 'src/app/modules/auth';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
   @Input() loggedIn: boolean;

   constructor() {}

   get AUTH_ROUTES(): typeof AuthRouteEnum {
      return AuthRouteEnum;
   }
}
