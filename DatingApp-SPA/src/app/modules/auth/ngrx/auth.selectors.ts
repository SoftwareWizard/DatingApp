import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState, authFeatureKey} from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);
export const user = createSelector(selectAuthState, state => state.user);
export const gender = createSelector(selectAuthState, state => state.user.gender);
export const isLoggedIn = createSelector(selectAuthState, state => !!state.user);
export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);
export const isAdminRole = createSelector(selectAuthState, state => state.user?.roles?.includes('Admin'));
export const isModeratorRole = createSelector(selectAuthState, state => state.user?.roles?.includes('Moderator'));
