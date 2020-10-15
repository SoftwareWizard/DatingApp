import { LoginModel } from './../models/login.model';
import { createAction, props } from '@ngrx/store';

export const navbarLogin = createAction('[Navbar] User Login', props<{ loginModel: LoginModel }>());
export const navbarLogout = createAction('[Navbar] User Logout');
