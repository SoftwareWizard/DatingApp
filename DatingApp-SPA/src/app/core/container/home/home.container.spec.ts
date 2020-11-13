import { HomeComponent } from './../../components/home/home.component';
import { HomeContainerComponent } from './home.container';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MockComponent, ngMocks } from 'ng-mocks';
import { AuthFacade } from 'src/app/modules/auth';
import * as authSelectors from '../../../modules/auth/ngrx/auth.selectors';
import { IFacadeSpy } from 'test/helper/facade-spy.type';
import { getFacadeSpy } from 'test/helper/facade-helper';
import { of } from 'rxjs';

describe('HomeContainer', () => {
   let spectator: Spectator<HomeContainerComponent>;
   let homeComponentMock: HomeComponent;
   let authFacadeSpy: IFacadeSpy<AuthFacade>;

   const createComponent = createComponentFactory({
      component: HomeContainerComponent,
      mocks: [AuthFacade],
      declarations: [MockComponent(HomeComponent)],
   });

   beforeEach(() => {
      spectator = createComponent();
      authFacadeSpy = spectator.inject(AuthFacade);
      homeComponentMock = ngMocks.find<HomeComponent>(
         spectator.fixture,
         'app-home'
      ).componentInstance;

      authFacadeSpy = getFacadeSpy(spectator, AuthFacade, authSelectors);
   });

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it('should pass loggedIn', async () => {
      authFacadeSpy.select.isLoggedIn = of(true);
      spectator.component.ngOnInit();
      spectator.detectComponentChanges();

      expect(homeComponentMock.loggedIn).toBeTrue();

      authFacadeSpy.select.isLoggedIn = of(false);
      spectator.component.ngOnInit();
      spectator.detectComponentChanges();

      expect(homeComponentMock.loggedIn).toBeFalse();
   });
});
