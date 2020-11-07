import { NavComponent } from './../../src/app/core/components/nav/nav.component';
import { Spectator } from '@ngneat/spectator';
import { LoginModel } from 'src/app/modules/auth';
import { By } from '@angular/platform-browser';
import { ngMocks } from 'ng-mocks';
import { HasRoleDirective } from 'test/mocks/has-role-mock.directive';

export class NavComponentPageObject {
   get usernameInput(): HTMLInputElement {
      return this.spectator.query('#username');
   }
   get passwordInput(): HTMLInputElement {
      return this.spectator.query('#password');
   }
   get dropDown(): HTMLElement {
      return this.spectator.query('#btnUserProfileDropDownToggle');
   }
   get btnHome(): HTMLElement {
      return this.spectator.query('#btnHome');
   }
   get btnMembers(): HTMLElement {
      return this.spectator.query('#btnMembers');
   }
   get btnMessages(): HTMLElement {
      return this.spectator.query('#btnMessages');
   }
   get btnLikes(): HTMLElement {
      return this.spectator.query('#btnLikes');
   }
   get btnAdmin(): HTMLElement {
      return this.spectator.query('#btnAdmin');
   }
   get btnTestError(): HTMLElement {
      return this.spectator.query('#btnTestError');
   }
   get imgUserPhoto(): HTMLImageElement {
      return this.spectator.query('#userPhoto');
   }
   get pUserName(): HTMLParagraphElement {
      return this.spectator.query('#userName');
   }

   get loginButton(): HTMLButtonElement {
      return this.spectator.query('#btnLogin');
   }
   get logoutButton(): HTMLButtonElement {
      return this.spectator.query('#btnLogout');
   }

   get hasRoleDirectiveMock(): HasRoleDirective {
      const adminButton = this.spectator.debugElement.query(By.css('#btnAdmin'));
      return ngMocks.get(adminButton, HasRoleDirective);
   }

   input = {
      set: (input: Partial<NavComponent>) => this.spectator.setInput(input),
   };

   output = {
      login: null as LoginModel,
      logout: false,
   };

   constructor(private spectator: Spectator<NavComponent>) {
      this.spectator
         .output('login')
         .subscribe((result: LoginModel) => (this.output.login = result));

      this.spectator
         .output('logout')
         .subscribe(() => (this.output.logout = true));
   }

   detectChanges(): void {
      this.spectator.detectChanges();
   }

   async whenStable(): Promise<void> {
      await this.spectator.fixture.whenStable();
   }

   clickMenuDropDown(): void {
      this.spectator.click(this.dropDown);
   }

   clickLogout(): void {
      this.spectator.click(this.logoutButton);
   }

   clickLogin(): void {
      this.spectator.click(this.loginButton);
      console.log(
         'DEBUG: NavComponentPageObject -> clickLogin -> this.loginButton',
         this.loginButton
      );
   }

   enterUsername(username: string): void {
      this.spectator.typeInElement(username, this.usernameInput);
   }

   enterPassword(password: string): void {
      this.spectator.typeInElement(password, this.passwordInput);
   }
}
