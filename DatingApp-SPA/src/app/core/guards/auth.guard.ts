import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate {
   constructor(private accountService: AccountService, private toastr: ToastrService) {}

   canActivate(): Observable<boolean> {
      return this.accountService.currentUser$.pipe(
         map(user => {
            if (user) {
               return true;
            }

            this.toastr.error('Forbidden path', 'Error');
            return false;
         })
      );
   }
}
