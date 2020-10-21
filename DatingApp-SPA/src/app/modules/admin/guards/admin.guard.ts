import { ToastrService } from 'ngx-toastr';
import { AuthFacade } from './../../auth/ngrx/auth.facade';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class AdminGuard implements CanActivate {
   constructor(private authFacade: AuthFacade, private toastr: ToastrService) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.authFacade.select.isAdminRole.pipe(
         map(isAdmin => {
            if (!isAdmin) {
               this.toastr.error('You are not allowed to enter this area');
            }
            return isAdmin;
         })
      );
   }
}
