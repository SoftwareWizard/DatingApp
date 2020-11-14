import { TEST_USER } from 'test/test-data/test-user';
import * as authSelectors from './auth.selectors';

describe('Auth Store', () => {
   describe('Selectors', () => {
      it('should return user', () => {
         expect(authSelectors.user.projector(TEST_USER)).toEqual(TEST_USER);
      });

      it('should return gender', () => {
         expect(authSelectors.gender.projector(TEST_USER)).toBe('male');
      });

      it('should return isLoggedIn', () => {
         expect(authSelectors.isLoggedIn.projector(TEST_USER)).toBeTrue();
         expect(authSelectors.isLoggedIn.projector(null)).toBeFalse();
      });

      it('should return isLoggedOut', () => {
         expect(authSelectors.isLoggedOut.projector(true)).toBeFalse();
         expect(authSelectors.isLoggedOut.projector(false)).toBeTrue();
      });

      it('should return isAdminRole', () => {
         let user = null;
         expect(authSelectors.isAdminRole.projector(user)).toBeFalse();
         user = { roles: null };
         expect(authSelectors.isAdminRole.projector(user)).toBeFalse();
         user = { roles: ['Admin'] };
         expect(authSelectors.isAdminRole.projector(user)).toBeTrue();
      });

      it('should return isModeratorRole', () => {
        let user = null;
        expect(authSelectors.isModeratorRole.projector(user)).toBeFalse();
        user = { roles: null };
        expect(authSelectors.isModeratorRole.projector(user)).toBeFalse();
        user = { roles: ['Moderator'] };
        expect(authSelectors.isModeratorRole.projector(user)).toBeTrue();
      });
   });
});
