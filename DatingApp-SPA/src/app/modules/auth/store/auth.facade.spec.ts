import { initialAuthState } from './auth.state';
import { reducer, AuthFacade } from './auth.facade';
import { TEST_USER } from 'test/test-data/test-user';
import { noopAction } from 'test/helper/noop-action';

describe('Auth Store', () => {
   const facade: AuthFacade = new AuthFacade();

   describe('Reducer', () => {
      it('should return initial State', () => {
         const state = reducer(initialAuthState, noopAction);
         expect(state).toEqual(initialAuthState);
        //  expect(state).toMatchSnapshot();
      });

      it('should work for appLoginSuccess', () => {
         const action = facade.appLoginSuccess(TEST_USER);
         const state = reducer(initialAuthState, action);
         expect(state.user).toEqual(TEST_USER);
      });

      it('should work for loginSuccess', () => {
         const action = facade.loginSuccess(TEST_USER);
         const state = reducer(initialAuthState, action);
         expect(state.user).toEqual(TEST_USER);
      });

      it('should work for changePhoto', () => {
         const testPhotoUrl = 'testPhotoUrl';
         const action = facade.changePhoto(testPhotoUrl);
         const state = reducer(initialAuthState, action);
         expect(state.user.photoUrl).toEqual(testPhotoUrl);
      });
   });
});
