import { AppRouteNames } from 'src/app/app-routing.names';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/core';
import { PresenceService } from 'src/app/core/services/presence.service';
import { AccountService } from '../services/account.service';
import { AuthEffects } from './auth.effects';
import { getActions } from '@ngrx-ducks/core';
import { AuthFacade } from './auth.facade';
import {
   SpyObject,
   SpectatorService,
   createServiceFactory,
} from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
   TEST_LOGINMODEL,
   TEST_REGISTER_MODEL,
   TEST_USER,
} from 'test/test-data';

const actions = getActions(AuthFacade);
const TEST_ERROR_MSG = 'testError';

describe('Auth Store', () => {
   let spectator: SpectatorService<AuthEffects>;
   let actions$ = new Observable<Action>();
   let toastrServiceSpy: SpyObject<ToastrService>;
   let accountServiceSpy: SpyObject<AccountService>;
   let localStorageServiceSpy: SpyObject<LocalStorageService>;
   let presenceServiceSpy: SpyObject<PresenceService>;
   let routerSpy: SpyObject<Router>;

   const createService = createServiceFactory({
      service: AuthEffects,
      mocks: [
         ToastrService,
         AccountService,
         LocalStorageService,
         PresenceService,
         Router,
      ],
      providers: [provideMockActions(() => actions$)],
   });

   beforeEach(() => (spectator = createService()));

   describe('Effects', () => {
      beforeEach(() => {
         toastrServiceSpy = spectator.inject(ToastrService);
         accountServiceSpy = spectator.inject(AccountService);
         localStorageServiceSpy = spectator.inject(LocalStorageService);
         presenceServiceSpy = spectator.inject(PresenceService);
         routerSpy = spectator.inject(Router);
      });

      describe('appLogin', () => {
         beforeEach(() => {
            const action = actions.appLogin();
            actions$ = of(action);
         });

         it('should work for success', async () => {
            localStorageServiceSpy.getUser.and.returnValue(TEST_USER);
            const expectedResult = actions.appLoginSuccess(TEST_USER);

            const result = await spectator.service.appLogin$.toPromise();

            expect(result).toEqual(expectedResult);
            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
               AppRouteNames.MEMBERS
            );
         });

         it('should work for error', async () => {
            localStorageServiceSpy.getUser.and.returnValue(null);
            const expectedResult = actions.appLoginFailure();

            const result = await spectator.service.appLogin$.toPromise();

            expect(result).toEqual(expectedResult);
            expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
         });
      });

      describe('navbarLogin', () => {
         beforeEach(() => {
            const action = actions.navbarLogin(TEST_LOGINMODEL);
            actions$ = of(action);
         });

         it('should work for success', async () => {
            accountServiceSpy.login.and.returnValue(of(TEST_USER));
            const expectedResult = actions.loginSuccess(TEST_USER);

            const result = await spectator.service.navbarLogin$.toPromise();
            expect(result).toEqual(expectedResult);
         });

         it('should work for error ', async () => {
            accountServiceSpy.login.and.returnValue(throwError(TEST_ERROR_MSG));
            const expectedResult = actions.loginFailure({
               error: TEST_ERROR_MSG,
            });

            const result = await spectator.service.navbarLogin$.toPromise();
            expect(result).toEqual(expectedResult);
         });
      });

      describe('navbarLogout', () => {
         beforeEach(() => {
            const action = actions.navbarLogout();
            actions$ = of(action);
         });

         it('should work', async () => {
            await spectator.service.navbarLogout$.toPromise();

            expect(presenceServiceSpy.stopHubConnection).toHaveBeenCalled();
            expect(localStorageServiceSpy.removeUser).toHaveBeenCalled();
            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
         });
      });

      describe('loginSuccess', () => {
         beforeEach(() => {
            const action = actions.loginSuccess(TEST_USER);
            actions$ = of(action);
         });

         it('should work', async () => {
            await spectator.service.loginSuccess$.toPromise();

            expect(localStorageServiceSpy.setUser).toHaveBeenCalledWith(
               TEST_USER
            );
            expect(presenceServiceSpy.createHubConnection).toHaveBeenCalledWith(
               TEST_USER
            );
            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
               AppRouteNames.MEMBERS
            );
            expect(toastrServiceSpy.success).toHaveBeenCalled();
         });
      });

      describe('loginFailure', () => {
         beforeEach(() => {
            const action = actions.loginFailure({ error: undefined });
            actions$ = of(action);
         });

         it('should work', async () => {
            await spectator.service.loginFailure$.toPromise();

            expect(toastrServiceSpy.error).toHaveBeenCalled();
         });
      });

      describe('registerPageRegisterUser', () => {
         beforeEach(() => {
            const action = actions.register(TEST_REGISTER_MODEL);
            actions$ = of(action);
         });

         it('should work for success', async () => {
            accountServiceSpy.register.and.returnValue(of(TEST_USER));
            const expectedResult = actions.registerSuccess();

            const result = await spectator.service.registerPageRegisterUser$.toPromise();
            expect(result).toEqual(expectedResult);
         });

         it('should work for error', async () => {
            accountServiceSpy.register.and.returnValue(
               throwError(TEST_ERROR_MSG)
            );
            const expectedResult = actions.registerFailure({
               error: TEST_ERROR_MSG,
            });

            const result = await spectator.service.registerPageRegisterUser$.toPromise();
            expect(result).toEqual(expectedResult);
         });
      });

      describe('registerSuccess', () => {
         beforeEach(() => {
            const action = actions.registerSuccess();
            actions$ = of(action);
         });

         it('should work', async () => {
            await spectator.service.registerSuccess$.toPromise();

            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
            expect(toastrServiceSpy.success).toHaveBeenCalled();
         });
      });

      describe('registerFailure', () => {
         beforeEach(() => {
            const action = actions.registerFailure({ error: undefined });
            actions$ = of(action);
         });

         it('should work', async () => {
            await spectator.service.registerFailure$.toPromise();

            expect(toastrServiceSpy.error).toHaveBeenCalled();
         });
      });
   });
});
