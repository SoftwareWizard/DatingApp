import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
export const user = createSelector(selectAuthState, state => state.user);
export const gender = createSelector(user, state => state.gender);
export const isLoggedIn = createSelector(user, state => !!state);
export const isLoggedOut = createSelector(isLoggedIn, state => !state);
export const isAdminRole = createSelector(user, state => state?.roles.includes('Admin'));
export const isModeratorRole = createSelector(user, state => state?.roles?.includes('Moderator'));
