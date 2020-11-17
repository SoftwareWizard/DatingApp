import { AuthFacade } from '../../store/auth.facade';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RegisterModel } from '../../models/register.model';

@Component({
   templateUrl: './register.container.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {
   constructor(private authFacade: AuthFacade) {}

   onRegister(registerModel: RegisterModel): void {
      this.authFacade.register.dispatch(registerModel);
   }
}
