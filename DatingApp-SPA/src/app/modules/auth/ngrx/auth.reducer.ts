import { LoginModel } from './../models/login.model';
import {
   ActionReducer,
   ActionReducerMap,
   createFeatureSelector,
   createReducer,
   createSelector,
   MetaReducer,
   on,
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as AuthActions from './auth.actions';
import { User } from '../models/user';

export const authFeatureKey = 'auth';

export interface AuthState {
   user: User;
}

export const initialAuthState: AuthState = {
   user: undefined,
};

export const reducer = createReducer(
   initialAuthState,

   on(AuthActions.loginSuccess, (_, action) => {
      return {
         user: action.user,
      };
   }),

   on(AuthActions.navbarLogout, _ => {
      return {
         user: undefined,
      };
   })
);

export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
