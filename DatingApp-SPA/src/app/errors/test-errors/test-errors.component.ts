import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
   selector: 'app-test-errors',
   templateUrl: './test-errors.component.html',
   styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
   baseUrl = 'http://localhost:5000/api';

   private sub: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
   validationErrors$ = this.sub.asObservable();
   hasValidationErrors$: Observable<boolean>;

   constructor(private http: HttpClient) {}

   ngOnInit(): void {
      this.hasValidationErrors$ = this.validationErrors$.pipe(map(errors => errors.length > 0));
   }

   async get400Error(): Promise<string> {
      try {
         return await this.http.get<string>(`${this.baseUrl}/buggy/bad-request`).toPromise();
      } catch (error) {
         console.error(error);
      }
   }

   async get400ValidationError(): Promise<string> {
      try {
         const model = { username: '', password: '' };
         return await this.http.post<string>(`${this.baseUrl}/auth/register`, model).toPromise();
      } catch (error) {
         this.sub.next(error);
      }
   }

   async get401Error(): Promise<string> {
      try {
         return await this.http.get<string>(`${this.baseUrl}/buggy/auth`).toPromise();
      } catch (error) {
         console.error(error);
      }
   }

   async get404Error(): Promise<string> {
      try {
         return await this.http.get<string>(`${this.baseUrl}/buggy/not-found`).toPromise();
      } catch (error) {
         console.error(error);
      }
   }

   async get500Error(): Promise<string> {
      try {
         return await this.http.get<string>(`${this.baseUrl}/buggy/server-error`).toPromise();
      } catch (error) {
         console.error(error);
      }
   }

   async get500NullReferenceExceptionError(): Promise<string> {
    try {
       return await this.http.get<string>(`${this.baseUrl}/buggy/null-reference-exception`).toPromise();
    } catch (error) {
       console.error(error);
    }
 }
}
