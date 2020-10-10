import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { delay, timeout } from 'rxjs/operators';
import { BusyService } from 'src/app/core/services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
   constructor(private busyService: BusyService) {}

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return from(this.handle(request, next));
   }

   async handle(request: HttpRequest<unknown>, next: HttpHandler): Promise<HttpEvent<unknown>> {
      this.busyService.busy();
      try {
         const result = await next.handle(request).pipe(timeout(5000)).toPromise();
         await of().pipe(delay(300)).toPromise();
         return result;
      } catch (error) {
        throw error;
      } finally {
         this.busyService.idle();
      }
   }
}
