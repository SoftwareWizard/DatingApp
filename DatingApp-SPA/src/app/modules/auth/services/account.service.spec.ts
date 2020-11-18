import { TEST_REGISTER_MODEL } from './../../../../../test/test-data/test-register-model';
import { TEST_USER } from 'test/test-data/test-user';
import { HttpClient } from '@angular/common/http';
import {
   createServiceFactory,
   SpectatorService,
   SpyObject,
} from '@ngneat/spectator';
import { AccountService } from './account.service';
import { of } from 'rxjs';

describe('AccountService', () => {
   let spectator: SpectatorService<AccountService>;
   let httpSpy: SpyObject<HttpClient>;

   const createService = createServiceFactory({
      service: AccountService,
      mocks: [HttpClient],
   });

   beforeEach(() => {
      spectator = createService();
      httpSpy = spectator.inject(HttpClient);
   });

   it('should be created', () => {
      expect(spectator.service).toBeTruthy();
   });

   describe('register', () => {
      it('should work', async () => {
         httpSpy.post.and.returnValue(of(TEST_USER));
         const result = await spectator.service
            .register(TEST_REGISTER_MODEL)
            .toPromise();

         expect(result).toEqual(TEST_USER);
      });
   });
});
