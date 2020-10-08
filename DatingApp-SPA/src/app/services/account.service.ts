import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/user';

export const LOCAL_STORAGE_KEY_USER = 'user';
const DelayInMilliseconds = 1000;

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   private baseUrl = environment.apiUrl;
   private currentUserSource = new ReplaySubject<User>(1);
   currentUser$ = this.currentUserSource.asObservable();

   constructor(private http: HttpClient) {}

   login(model: any): Promise<void> {
      return this.http
         .post<User>(`${this.baseUrl}/auth`, model)
         .pipe(
            delay(DelayInMilliseconds),
            map(user => {
               if (user) {
                  localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
                  this.currentUserSource.next(user);
               }
            })
         )
         .toPromise();
   }

   logout(): void {
      this.currentUserSource.next(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
   }

   setCurrentUser(user: any): void {
      this.currentUserSource.next(user);
   }

   register(model: any): Promise<void> {
      return this.http
         .post<User>(`${this.baseUrl}/auth/register`, model)
         .pipe(
            delay(DelayInMilliseconds),
            map(user => {
               if (user) {
                  localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
                  this.currentUserSource.next(user);
               }
            })
         )
         .toPromise();
   }
}
