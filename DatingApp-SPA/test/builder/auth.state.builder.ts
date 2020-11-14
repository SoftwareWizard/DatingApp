import { TEST_USER } from './../test-data/test-user';
import { AuthState } from './../../src/app/modules/auth/store/auth.state';
import { AppState } from 'src/app/core/ngrx/app.reducer';
import { User } from 'src/app/modules/auth';

export class AuthStateBuilder {
   // tslint:disable-next-line: variable-name
   private _user: User;
   // tslint:disable-next-line: variable-name
   private _authState: AuthState;

   constructor() {
      this._user = TEST_USER;
   }

   user = {
      withRoles: (roles: string[]): AuthStateBuilder => {
         this._user.roles = roles;
         return this;
      },

      withGender: (gender: 'male' | 'female'): AuthStateBuilder => {
         this._user.gender = gender;
         return this;
      },
   };

   withUser(user: User): AuthStateBuilder {
      this._user = user;
      return this;
   }

   build(): AppState {
      this._authState = {
         user: this._user,
      };

      return { auth: this._authState };
   }
}
