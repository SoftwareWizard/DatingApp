import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { ReplaySubject } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   private baseUrl = 'http://localhost:5000/api';
   private currentUserSource = new ReplaySubject<User>(1);
   currentUser$ = this.currentUserSource.asObservable();

   constructor(private http: HttpClient) {}

   login(model: any): Promise<void> {
      return this.http
         .post<User>(`${this.baseUrl}/auth`, model)
         .pipe(
            delay(2000),
            map(user => {
               if (user) {
                  this.currentUserSource.next(user);
               }
            })
         )
         .toPromise();
   }

   logout(): void {
      this.currentUserSource.next(null);
   }

   register(model: any): Promise<void> {
      return this.http
         .post<User>(`${this.baseUrl}/auth/register`, model)
         .pipe(
            delay(2000),
            map(user => {
               if (user) {
                  localStorage.setItem('user', JSON.stringify(user));
                  this.currentUserSource.next(user);
               }
            })
         )
         .toPromise();
   }
}
