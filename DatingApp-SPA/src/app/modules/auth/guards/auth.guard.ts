import { AuthFacade } from './../store/auth.facade';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate {
   constructor(private authFacade: AuthFacade, private toastr: ToastrService) {}

   canActivate(): Observable<boolean> {
      return this.authFacade.select.isLoggedIn.pipe(
         tap(isLoggedIn => {
            if (!isLoggedIn) {
               this.toastr.error('You are not allowed to navigate to this page.', 'Forbidden');
            }
         })
      );
   }
}
