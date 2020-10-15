import { createSelector, createFeatureSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
export const user = createSelector(selectAuthState, auth => auth.user);
export const isLoggedIn = createSelector(selectAuthState, auth => !!auth.user);
export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);

