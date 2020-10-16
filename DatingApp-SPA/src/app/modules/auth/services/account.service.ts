import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

export const LOCAL_STORAGE_KEY_USER = 'user';
const DelayInMilliseconds = 1000;

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   private baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   login(model: any): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/auth`, model);
   }

   register(model: any): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/auth/register`, model);
   }
}
