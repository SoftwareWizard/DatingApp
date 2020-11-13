import { User } from '../models/user';

export const authFeatureKey = 'auth';

export interface AuthState {
   user: User;
}

export const initialAuthState: AuthState = {
   user: undefined,
};
