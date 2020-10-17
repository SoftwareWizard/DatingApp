import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getActions } from '@ngrx-ducks/core';
import { Actions } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { AppRouteNames } from 'src/app/app-routing.names';
import { MembersFacade } from './members.facade';

const actions = getActions(MembersFacade);

@Injectable({
   providedIn: 'root',
})
export class MembersEffects {
   ROUTES = AppRouteNames;

   constructor(private actions$: Actions, private toastr: ToastrService, private router: Router) {}
}
