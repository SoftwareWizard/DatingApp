import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthState } from '../ngrx/auth.reducer';
import { Store, select } from '@ngrx/store';
import * as AuthSelectors from '../ngrx/auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate {
   constructor(private authStore: Store<AuthState>, private toastr: ToastrService) {}

   canActivate(): Observable<boolean> {
      // this.authStore.pipe(
      //    select(AuthSelectors.isLoggedOut),
      //    tap(_ => this.toastr.error('You are not allowed to navigate to this page.'))
      // );
    // FIXME: show toaster if not logged in
      return this.authStore.pipe(select(AuthSelectors.isLoggedIn));
   }
}
