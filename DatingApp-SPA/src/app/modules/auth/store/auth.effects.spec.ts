import { AppRouteNames } from './../../../app-routing.names';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/core';
import { PresenceService } from 'src/app/core/services/presence.service';
import { AccountService } from '../services/account.service';
import { AuthEffects } from './auth.effects';
import { getActions, dispatch } from '@ngrx-ducks/core';
import { AuthFacade } from './auth.facade';
import { TEST_USER } from 'test/test-data/test-user';
import { SpyObject } from '@ngneat/spectator';
import { cold, hot } from 'jasmine-marbles';
import { createEffects } from '@ngrx/effects/src/effects_module';

const actions = getActions(AuthFacade);

describe('Auth Store', () => {
   let effects: AuthEffects;
   let actions$: Observable<any>;
   let toastrServiceSpy: SpyObject<ToastrService>;
   let accountServiceSpy: SpyObject<AccountService>;
   let localStorageServiceSpy: SpyObject<LocalStorageService>;
   let presenceServiceSpy: SpyObject<PresenceService>;
   let routerSpy: SpyObject<Router>;

   describe('Effects', () => {
      beforeEach(() => {
         toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
            'success',
            'error',
         ]);
         accountServiceSpy = jasmine.createSpyObj('AccountService', [
            'login',
            'register',
         ]);
         localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
            'getUser',
            'setUser',
            'removeUser',
         ]);
         presenceServiceSpy = jasmine.createSpyObj('PresenceService', [
            'createHubConnection',
            'stopHubConnection',
         ]);

         routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
      });

      describe('appLoginName', () => {
         const action = actions.appLogin();

         it('should route to members and dispatch appLoginSuccess when successful', async () => {
            const expectedResult = actions.appLoginSuccess(TEST_USER);
            actions$ = of(action);
            effects = createAuthEffects();

            localStorageServiceSpy.getUser.and.returnValue(TEST_USER);

            const result = await effects.appLoginName$.toPromise();

            expect(result).toEqual(expectedResult);
            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
               AppRouteNames.MEMBERS
            );
         });

         it('should dispatch appLoginFailure when error', async () => {
            const expectedResult = actions.appLoginFailure();
            actions$ = of(action);
            effects = createAuthEffects();

            localStorageServiceSpy.getUser.and.returnValue(null);
            const result = await effects.appLoginName$.toPromise();

            expect(result).toEqual(expectedResult);
            expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
         });
      });
   });

   function createAuthEffects(): AuthEffects {
      return new AuthEffects(
         actions$,
         toastrServiceSpy,
         accountServiceSpy,
         localStorageServiceSpy,
         presenceServiceSpy,
         routerSpy
      );
   }
});
