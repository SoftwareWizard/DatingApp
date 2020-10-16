import { LoginModel } from './../models/login.model';
import { RegisterModel } from './../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   private baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   login(model: LoginModel): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/auth`, model);
   }

   register(model: RegisterModel): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/auth/register`, model);
   }
}
