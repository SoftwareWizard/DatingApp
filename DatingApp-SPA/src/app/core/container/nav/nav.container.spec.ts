import { TEST_USER } from 'test/test-data/test-user';
import { NavComponent } from './../../components/nav/nav.component';
import { MockComponent, ngMocks } from 'ng-mocks';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { NavContainerComponent } from '..';
import { of } from 'rxjs';
import { AuthFacade } from 'src/app/modules/auth';
import * as authSelectors from '../../../modules/auth/ngrx/auth.selectors';
import { IFacadeSpy } from 'test/mocks/facade-spy.type';
import { getSpyFacade } from 'test/mocks/spy.facade';

describe('NavContainer', () => {
   let spectator: Spectator<NavContainerComponent>;
   let navComponentMock: NavComponent;
   let authFacadeSpy: IFacadeSpy<AuthFacade>;

   const createComponent = createComponentFactory({
      component: NavContainerComponent,
      mocks: [AuthFacade],
      declarations: [MockComponent(NavComponent)],
   });

   beforeEach(() => {
      spectator = createComponent();
      navComponentMock = ngMocks.find<NavComponent>(
         spectator.fixture,
         'app-nav'
      ).componentInstance;

      authFacadeSpy = getSpyFacade(spectator, AuthFacade, authSelectors);
   });

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it('should pass observables to component', async () => {
      authFacadeSpy.select.isLoggedIn = of(true);
      authFacadeSpy.select.isLoggedOut = of(true);
      authFacadeSpy.select.user = of(TEST_USER);

      spectator.component.ngOnInit();
      spectator.detectComponentChanges();

      expect(navComponentMock.loggedIn).toBeTrue();
      expect(navComponentMock.loggedOut).toBeTrue();
      expect(navComponentMock.user).toBe(TEST_USER);
   });

   describe('onLogin', () => {
      it('should dispatch navbarLogin with LoginModel', () => {
         const testUsername = 'testUsername';
         const testPassword = 'testPassword';

         const testLoginModel = {
            username: testUsername,
            password: testPassword,
         };

         navComponentMock.login.emit(testLoginModel);
         expect(authFacadeSpy.navbarLogin.dispatch).toHaveBeenCalledWith(
            testLoginModel
         );
      });
   });

   describe('onLogout', () => {
      it('should dispatch navbarLogout', () => {
         navComponentMock.logout.emit();
         expect(authFacadeSpy.navbarLogout.dispatch).toHaveBeenCalled();
      });
   });
});
