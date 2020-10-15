import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { AuthState } from './auth.state';

export const authFeatureKey = 'auth';

export const reducers: ActionReducerMap<AuthState> = {

};

export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
