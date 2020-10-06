import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   private baseUrl = 'http://localhost:5000/api';
   private currentUserSource = new ReplaySubject<User>(1);
   currentUser$ = this.currentUserSource.asObservable();

   constructor(private http: HttpClient) {}

   login(model: any) {
      return this.http.post<User>(`${this.baseUrl}/auth`, model).pipe(
         map(user => {
            if (user) {
               this.currentUserSource.next(user);
            }
         })
      );
   }

   logout(): void {
      this.currentUserSource.next(null);
   }
}
