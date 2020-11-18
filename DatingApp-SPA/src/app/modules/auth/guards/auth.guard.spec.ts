import { getFacadeSpyFromService } from './../../../../../test/helper/facade-helper';
import { AuthFacade } from 'src/app/modules/auth';
import {
   createServiceFactory,
   SpectatorService,
   SpyObject,
} from '@ngneat/spectator';
import { AuthGuard } from './auth.guard';
import { ToastrService } from 'ngx-toastr';
import * as authSelectors from '../store/auth.selectors';
import { IFacadeSpy } from 'test/helper/facade-spy.type';
import { of } from 'rxjs';

describe('AuthGuard', () => {
   let spectator: SpectatorService<AuthGuard>;
   let authFacadeSpy: IFacadeSpy<AuthFacade>;
   let toastrServiceSpy: SpyObject<ToastrService>;

   const createService = createServiceFactory({
      service: AuthGuard,
      mocks: [ToastrService, AuthFacade],
   });

   beforeEach(() => {
      spectator = createService();
      toastrServiceSpy = spectator.inject(ToastrService);
      authFacadeSpy = getFacadeSpyFromService(
         spectator,
         AuthFacade,
         authSelectors
      );
   });

   it('should be created', () => {
      expect(spectator.service).toBeTruthy();
   });

   it('should block unauthenticated User', async () => {
      authFacadeSpy.select.isLoggedIn = of(false);
      const result = await spectator.service.canActivate().toPromise();

      expect(result).toBeFalse();
      expect(toastrServiceSpy.error).toHaveBeenCalled();
   });

   it('should pass authenticated User', async () => {
      authFacadeSpy.select.isLoggedIn = of(true);
      const result = await spectator.service.canActivate().toPromise();

      expect(result).toBeTrue();
      expect(toastrServiceSpy.error).not.toHaveBeenCalled();
   });
});
