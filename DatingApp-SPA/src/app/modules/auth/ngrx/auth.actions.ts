import { LoginModel } from './../models/login.model';
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const navbarLogin = createAction('[Navbar] User Login', props<{ loginModel: LoginModel }>());
export const loginSuccess = createAction('[AuthEffect] Login Success', props<{ user: User }>());
export const loginFailed = createAction('[AuthEffect] Login Failed', props<{ error: any }>());
export const navbarLogout = createAction('[Navbar] User Logout');
