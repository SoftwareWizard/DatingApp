import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

import { StatusCodes } from 'http-status-codes';
import { AppRoutes } from '../app-routing.module';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   constructor(private router: Router, private toastr: ToastrService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
         catchError(error => {
            if (error) {
               switch (error.status) {
                  case StatusCodes.BAD_REQUEST:
                     if (error?.error?.errors) {
                        const modalStateErrors = [];
                        for (const key in error.error.errors) {
                           if (error.error.errors[key]) {
                              modalStateErrors.push(error.error.errors[key]);
                           }
                        }
                        throw modalStateErrors.flat();
                     } else {
                        this.toastr.error(error.statusText, error.status);
                     }
                     break;

                  case StatusCodes.UNAUTHORIZED:
                     this.toastr.error(error.statusText, error.status);
                     break;

                  case StatusCodes.NOT_FOUND:
                     this.router.navigateByUrl(`/${AppRoutes.NOT_FOUND}`);
                     break;

                  case StatusCodes.INTERNAL_SERVER_ERROR:
                     const navigationExtras: NavigationExtras = { state: { error: error.error } };
                     this.router.navigateByUrl(`/${AppRoutes.SERVER_ERROR}`, navigationExtras);
                     break;

                  default:
                     this.toastr.error('Something unexpected went wrong');
                     console.error(error);
                     break;
               }
            }

            return throwError(error);
         })
      );
   }
}
