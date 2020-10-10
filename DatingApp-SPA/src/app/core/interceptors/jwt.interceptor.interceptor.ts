import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   constructor(private accountService: AccountService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return from(this.handle(request, next));
   }

   async handle(request: HttpRequest<unknown>, next: HttpHandler): Promise<HttpEvent<unknown>> {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      if (token) {
         const headerValue = `Bearer  ${token}`;
         request = request.clone({
            setHeaders: {
               Authorization: headerValue,
            },
         });
      }

      return next.handle(request).toPromise();
   }
}
