import { LoginModel } from './../models/login.model';
import { RegisterModel } from './../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { user } from '../ngrx/auth.selectors';

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   private baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   login(model: LoginModel): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/auth`, model).pipe(
         map(item => {
            const roles = this.getDecodedToken(item.token).role;
            Array.isArray(roles) ? (item.roles = roles) : item.roles = [roles];
            return item;
         })
      );
   }

   register(model: RegisterModel): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/auth/register`, model);
   }

   getDecodedToken(token): any {
      const tokenPayloadEncoded = token.split('.')[1];
      const tokenPayloadPlain = atob(tokenPayloadEncoded);
      return JSON.parse(tokenPayloadPlain);
   }
}
