import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreventUnsavedChangesGuard } from 'src/app/core';

import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { MemberListComponent } from './components/member-list/member-list.component';

import { MembersRouteNames } from './members-routing.names';

const routes: Routes = [
   { path: '', component: MemberListComponent },
   { path: ':id', component: MemberDetailComponent },
   {
      path: MembersRouteNames.EDIT,
      component: MemberEditComponent,
      canDeactivate: [PreventUnsavedChangesGuard],
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class MembersRoutingModule {}
