import { TEST_REGISTER_MODEL } from './../../../../../../test/test-data/test-register-model';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent, ngMocks } from 'ng-mocks';
import { getFacadeSpy } from 'test/helper/facade-helper';
import { IFacadeSpy } from 'test/helper/facade-spy.type';
import { AuthFacade } from '../..';
import { RegisterComponent } from '../../components/register/register.component';
import { RegisterContainerComponent } from './register.container';
import * as authSelectors from '../../store/auth.selectors';

describe('RegisterContainer', () => {
   let spectator: Spectator<RegisterContainerComponent>;
   let registerComponentMock: RegisterComponent;
   let authFacadeSpy: IFacadeSpy<AuthFacade>;

   const createComponent = createComponentFactory({
      component: RegisterContainerComponent,
      mocks: [AuthFacade],
      declarations: [MockComponent(RegisterComponent)],
   });

   beforeEach(() => {
      spectator = createComponent();
      authFacadeSpy = spectator.inject(AuthFacade);
      registerComponentMock = ngMocks.find<RegisterComponent>(
         spectator.fixture,
         'app-register'
      ).componentInstance;

      authFacadeSpy = getFacadeSpy(spectator, AuthFacade, authSelectors);
   });

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it('should pass register', async () => {
      registerComponentMock.register.emit(TEST_REGISTER_MODEL);
      expect(authFacadeSpy.register.dispatch).toHaveBeenCalledWith(
         TEST_REGISTER_MODEL
      );
   });
});
