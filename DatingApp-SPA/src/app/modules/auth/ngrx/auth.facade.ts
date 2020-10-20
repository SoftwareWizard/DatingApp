import { bindSelectors, createDuck, dispatch, getReducer, StoreFacade } from '@ngrx-ducks/core';
import * as authSelectors from './auth.selectors';
import { LoginModel } from '../models/login.model';
import { User } from '../models/user';
import { RegisterModel } from '../models/register.model';
import { AuthState, initialAuthState, authFeatureKey } from './auth.state';
import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@StoreFacade()
export class AuthFacade {
   select = bindSelectors(authSelectors);

   appLogin = createDuck('[App] User Login');

   appLoginSuccess = createDuck(
      '[AuthEffect] App User Login Success',
      (state: AuthState, payload: User) => ({ ...state, user: payload })
   );

   appLoginFailure = createDuck('[AuthEffect] App User Login Failure');

   navbarLogin = createDuck('[Navbar] User Login', dispatch<LoginModel>());

   loginSuccess = createDuck(
      '[AuthEffect] User Login Success',
      (state: AuthState, payload: User) => ({ ...state, user: payload })
   );

   loginFailure = createDuck('[AuthEffect] User Login Failure', dispatch<{ error: any }>());

   navbarLogout = createDuck('[Navbar] User Logout', (state: AuthState) => ({
      ...state,
      user: undefined,
   }));

   register = createDuck('[RegisterPage] User Register', dispatch<RegisterModel>());

   registerSuccess = createDuck('[AuthEffect] User Register Success');

   registerFailure = createDuck('[AuthEffect] User Register Failure', dispatch<{ error: any }>());
}

export const featureKey = authFeatureKey;
export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
export const reducer = getReducer(initialAuthState, AuthFacade);
