import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState, authFeatureKey} from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
export const user = createSelector(selectAuthState, auth => auth.user);
export const isLoggedIn = createSelector(selectAuthState, auth => !!auth.user);
export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);

