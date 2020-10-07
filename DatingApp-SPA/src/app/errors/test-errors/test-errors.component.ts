import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-test-errors',
   templateUrl: './test-errors.component.html',
   styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
   baseUrl = 'http://localhost:5000/api';

   constructor(private http: HttpClient) {}

   ngOnInit(): void {}

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
         console.error(error);
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
}
