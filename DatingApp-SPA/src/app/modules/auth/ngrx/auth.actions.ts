import { RegisterModel } from './../models/register.model';
import { LoginModel } from './../models/login.model';
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const navbarLogin = createAction('[Navbar] User Login', props<{ loginModel: LoginModel }>());
export const loginSuccess = createAction('[AuthEffect] User Login Success', props<{ user: User }>());
export const loginFailure = createAction('[AuthEffect] User Login Failure', props<{ error: any }>());
export const navbarLogout = createAction('[Navbar] User Logout');
export const register = createAction('[RegisterPage] User Register', props<{ registerModel: RegisterModel }>());
export const registerSuccess = createAction('[AuthEffect] User Register Success');
export const registerFailure = createAction('[AuthEffect] User Register Failure', props<{ error: any }>());
