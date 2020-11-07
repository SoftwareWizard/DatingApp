import { SharedModule } from './../../../modules/shared/shared.module';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { NavComponent } from './nav.component';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { MockDirective, ngMocks } from 'ng-mocks';
import { waitForAsync } from '@angular/core/testing';
import { NavComponentPageObject } from 'test/page-objects/nav.component.po';
import { TEST_USER } from 'test/test-data/test-user';
import { HasRoleDirective } from 'test/mocks/has-role-mock.directive';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
   let spectator: Spectator<NavComponent>;
   let pageObject: NavComponentPageObject;

   const createComponent = createComponentFactory({
      component: NavComponent,
      declarations: [
         MockDirective(RouterLinkWithHref),
         MockDirective(RouterLinkActive),
         HasRoleDirective,
      ],
      imports: [SharedModule],
   });

   beforeEach(() => {
      spectator = createComponent();
      pageObject = new NavComponentPageObject(spectator);
   });

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it(
      'should emit loginModel on login',
      waitForAsync(async () => {
         const testUsername = 'testUsername';
         const testPassword = 'testPassword';

         pageObject.input.set({ user: null, loggedIn: false, loggedOut: true });
         pageObject.detectChanges();

         await pageObject.whenStable();

         pageObject.enterUsername(testUsername);
         pageObject.enterPassword(testPassword);
         pageObject.clickLogin();

         expect(pageObject.output.login).toEqual({
            username: testUsername,
            password: testPassword,
         });
      })
   );

   it(
      'should emit on logout',
      waitForAsync(async () => {
         pageObject.input.set({ user: null, loggedIn: true, loggedOut: false });
         pageObject.detectChanges();
         await pageObject.whenStable();

         pageObject.clickMenuDropDown();
         await pageObject.whenStable();

         pageObject.clickLogout();

         expect(pageObject.output.logout).toBeTrue();
      })
   );

   it('should display correct when logged in', () => {
      pageObject.input.set({
         user: TEST_USER,
         loggedIn: true,
         loggedOut: false,
      });
      pageObject.detectChanges();

      expect(pageObject.btnHome).toBeTruthy();
      expect(pageObject.btnMembers).toBeTruthy();
      expect(pageObject.btnMessages).toBeTruthy();
      expect(pageObject.btnLikes).toBeTruthy();
      expect(pageObject.btnAdmin).toBeFalsy();
      expect(pageObject.btnTestError).toBeTruthy();
      expect(pageObject.imgUserPhoto).toBeTruthy();
      expect(pageObject.pUserName).toBeTruthy();

      expect(pageObject.imgUserPhoto.src).toBe(
         `${TEST_USER.photoUrl.toLowerCase()}/`
      );
      expect(pageObject.pUserName.textContent).toBe(
         TEST_USER.userName.toUpperCase()
      );
   });

   it('should display correct when logged out', () => {
      pageObject.input.set({ user: null, loggedIn: false, loggedOut: true });
      pageObject.detectChanges();

      expect(pageObject.btnHome).toBeTruthy();
      expect(pageObject.btnMembers).toBeFalsy();
      expect(pageObject.btnMessages).toBeFalsy();
      expect(pageObject.btnLikes).toBeFalsy();
      expect(pageObject.btnAdmin).toBeFalsy();
      expect(pageObject.btnTestError).toBeTruthy();
      expect(pageObject.imgUserPhoto).toBeFalsy();
      expect(pageObject.pUserName).toBeFalsy();
   });

   it('should display admin link correct dependent of role', () => {
      pageObject.input.set({
         user: TEST_USER,
         loggedIn: true,
         loggedOut: false,
      });

      const hasRoleDirectiveMock = pageObject.hasRoleDirectiveMock;
      hasRoleDirectiveMock.hide();
      pageObject.detectChanges();

      expect(pageObject.btnAdmin).toBeFalsy();

      hasRoleDirectiveMock.show();
      pageObject.detectChanges();

      expect(pageObject.btnAdmin).toBeTruthy();
   });
});
