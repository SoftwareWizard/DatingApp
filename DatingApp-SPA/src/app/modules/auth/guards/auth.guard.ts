import { AuthFacade } from './../ngrx/auth.facade';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate {
   constructor(private authFacade: AuthFacade, private toastr: ToastrService) {}

   canActivate(): Observable<boolean> {
      // this.authStore.pipe(
      //    select(AuthSelectors.isLoggedOut),
      //    tap(_ => this.toastr.error('You are not allowed to navigate to this page.'))
      // );
      // FIXME: show toaster if not logged in
      return this.authFacade.select.isLoggedIn;
   }
}
