import { TEST_USER } from 'test/test-data/test-user';
import * as authSelectors from './auth.selectors';
import { AuthStateBuilder } from 'test/builder/auth.state.builder';

describe('Auth Store', () => {
   describe('Selectors', () => {
      it('should return user', () => {
         const authState = new AuthStateBuilder().build();
         expect(authSelectors.user(authState)).toEqual(TEST_USER);
      });

      it('should return gender', () => {
         const authState = new AuthStateBuilder().user
            .withGender('female')
            .build();
         expect(authSelectors.gender(authState)).toBe('female');
      });

      it('should return isLoggedIn', () => {
         let authState = new AuthStateBuilder().build();
         expect(authSelectors.isLoggedIn(authState)).toBeTrue();

         authState = new AuthStateBuilder().withUser(null).build();
         expect(authSelectors.isLoggedIn(authState)).toBeFalse();
      });

      it('should return isLoggedOut', () => {
         let authState = new AuthStateBuilder().build();
         expect(authSelectors.isLoggedOut(authState)).toBeFalse();

         authState = new AuthStateBuilder().withUser(null).build();
         expect(authSelectors.isLoggedOut(authState)).toBeTrue();
      });

      it('should return isAdminRole', () => {
         const authState = new AuthStateBuilder().user
            .withRoles(['Admin'])
            .build();
         expect(authSelectors.isAdminRole(authState)).toBeTrue();
      });

      it('should return isModeratorRole', () => {
         const authState = new AuthStateBuilder().user
            .withRoles(['Moderator'])
            .build();
         expect(authSelectors.isModeratorRole(authState)).toBeTrue();
      });
   });
});
