import { HomeComponent } from './../../components/home/home.component';
import { AuthFacade } from 'src/app/modules/auth';
import { HomeContainerComponent } from './home.container';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { of } from 'rxjs';
import { selectAuthSpy } from 'src/app/modules/auth/ngrx/auth.selectors.spec';
import { MockComponent, ngMocks } from 'ng-mocks';

describe('HomeContainer', () => {
   let spectator: Spectator<HomeContainerComponent>;
   const createComponent = createComponentFactory({
      component: HomeContainerComponent,
      mocks: [AuthFacade],
      declarations: [MockComponent(HomeComponent)],
   });

   beforeEach(() => (spectator = createComponent()));

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it('should pass loggedIn', async () => {
      const authFacadeSpy = spectator.inject(AuthFacade);
      const homeComponentMock = ngMocks.find<HomeComponent>(spectator.fixture, 'app-home')
         .componentInstance;
      authFacadeSpy.select = selectAuthSpy;

      selectAuthSpy.isLoggedIn = of(true);
      spectator.component.ngOnInit();
      spectator.detectChanges();

      expect(homeComponentMock.loggedIn).toBeTrue();

      selectAuthSpy.isLoggedIn = of(false);
      spectator.component.ngOnInit();
      spectator.detectChanges();

      expect(homeComponentMock.loggedIn).toBeFalse();
   });
});
