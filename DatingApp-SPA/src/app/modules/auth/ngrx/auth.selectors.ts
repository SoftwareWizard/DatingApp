import { createSelector, createFeatureSelector, createReducer } from '@ngrx/store';
import { AuthState, authFeatureKey} from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
export const user = createSelector(selectAuthState, state => state.user);
export const gender = createSelector(selectAuthState, state => state.user.gender);
export const isLoggedIn = createSelector(selectAuthState, state => !!state.user);
export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);

