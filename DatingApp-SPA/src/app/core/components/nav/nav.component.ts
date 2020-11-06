import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AppRouteNames } from 'src/app/app-routing.names';
import { MembersRouteNames } from 'src/app/modules/members/members-routing.names';
import { LoginModel, User } from 'src/app/modules/auth';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
   ROUTES = AppRouteNames;
   MEMBERS_ROUTES = MembersRouteNames;

   @Input() user: User;
   @Input() loggedIn: boolean;
   @Input() loggedOut: boolean;

   @Output() login = new EventEmitter<LoginModel>();
   @Output() logout = new EventEmitter();

   loginModel: LoginModel = { username: null, password: null };

   onLogin(): void {
      this.login.emit(this.loginModel);
   }

   onLogout(): void {
      this.logout.emit();
   }
}
