import { PageObjectBase } from './base.po';
import { RouterLinkWithHref } from '@angular/router';
import { NavComponent } from './../../src/app/core/components/nav/nav.component';
import { Spectator } from '@ngneat/spectator';
import { LoginModel, User } from 'src/app/modules/auth';
import { HasRoleDirective } from 'test/mocks/has-role-mock.directive';

enum CssSelectors {
   USERNAME = '#username',
   PASSWORD = '#password',
   BTN_USERPROFILE_DROPDOWN_TOGGLE = '#btnUserProfileDropDownToggle',
   BTN_HOME = '#btnHome',
   BTN_MEMBERS = '#btnMembers',
   BTN_MESSAGES = '#btnMessages',
   BTN_LIKES = '#btnLikes',
   BTN_ADMIN = '#btnAdmin',
   BTN_TEST_ERRORS = '#btnTestError',
   IMG_USER_PHOTO = '#userPhoto',
   P_USERNAME = '#userName',
   BTN_LOGIN = '#btnLogin',
   BTN_LOGOUT = '#btnLogout',
}

enum Outputs {
   LOGIN = 'login',
   LOGOUT = 'logout',
}

export class NavComponentPageObject extends PageObjectBase<NavComponent> {
   get usernameInput(): HTMLInputElement {
      return this.getElement(CssSelectors.USERNAME);
   }
   get passwordInput(): HTMLInputElement {
      return this.getElement(CssSelectors.PASSWORD);
   }
   get dropDown(): HTMLElement {
      return this.getElement(CssSelectors.BTN_USERPROFILE_DROPDOWN_TOGGLE);
   }
   get btnHome(): HTMLElement {
      return this.getElement(CssSelectors.BTN_HOME);
   }
   get btnMembers(): HTMLElement {
      return this.getElement(CssSelectors.BTN_MEMBERS);
   }
   get btnMessages(): HTMLElement {
      return this.getElement(CssSelectors.BTN_MESSAGES);
   }
   get btnLikes(): HTMLElement {
      return this.getElement(CssSelectors.BTN_LIKES);
   }
   get btnAdmin(): HTMLElement {
      return this.getElement(CssSelectors.BTN_ADMIN);
   }
   get btnTestError(): HTMLElement {
      return this.getElement(CssSelectors.BTN_TEST_ERRORS);
   }
   get imgUserPhoto(): HTMLImageElement {
      return this.getElement(CssSelectors.IMG_USER_PHOTO);
   }
   get pUserName(): HTMLParagraphElement {
      return this.getElement(CssSelectors.P_USERNAME);
   }

   get loginButton(): HTMLButtonElement {
      return this.getElement(CssSelectors.BTN_LOGIN);
   }
   get logoutButton(): HTMLButtonElement {
      return this.getElement(CssSelectors.BTN_LOGOUT);
   }

   get btnAdminHasRoleDirectiveMock(): HasRoleDirective {
      return this.getMockDirective(CssSelectors.BTN_ADMIN, HasRoleDirective);
   }

   get btnHomeRouterLinkMock(): RouterLinkWithHref {
      return this.getMockDirective(CssSelectors.BTN_HOME, RouterLinkWithHref);
   }

   get btnMembersRouterLinkMock(): RouterLinkWithHref {
      return this.getMockDirective(
         CssSelectors.BTN_MEMBERS,
         RouterLinkWithHref
      );
   }

   get btnLikesRouterLinkMock(): RouterLinkWithHref {
      return this.getMockDirective(CssSelectors.BTN_LIKES, RouterLinkWithHref);
   }

   get btnMessagesRouterLinkMock(): RouterLinkWithHref {
      return this.getMockDirective(
         CssSelectors.BTN_MESSAGES,
         RouterLinkWithHref
      );
   }

   get btnAdminRouterLinkMock(): RouterLinkWithHref {
      return this.getMockDirective(CssSelectors.BTN_ADMIN, RouterLinkWithHref);
   }

   get btnTestErrorRouterLinkMock(): RouterLinkWithHref {
      return this.getMockDirective(
         CssSelectors.BTN_TEST_ERRORS,
         RouterLinkWithHref
      );
   }

   output = {
      login: null as LoginModel,
      logout: false,
   };

   constructor(spectator: Spectator<NavComponent>) {
      super(spectator);

      this.spectator
         .output(Outputs.LOGIN)
         .subscribe((result: LoginModel) => (this.output.login = result));

      this.spectator
         .output(Outputs.LOGOUT)
         .subscribe(() => (this.output.logout = true));
   }

   clickMenuDropDown(): void {
      this.spectator.click(this.dropDown);
   }

   clickLogout(): void {
      this.spectator.click(this.logoutButton);
   }

   clickLogin(): void {
      this.spectator.click(this.loginButton);
   }

   enterUsername(username: string): void {
      this.spectator.typeInElement(username, this.usernameInput);
   }

   enterPassword(password: string): void {
      this.spectator.typeInElement(password, this.passwordInput);
   }

   loginToPage(user?: User): void {
      this.input.set({ user, loggedIn: true, loggedOut: false });
   }
}
