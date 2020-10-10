import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteNames } from './app-routing.names';

import { AuthGuard, PreventUnsavedChangesGuard } from './core';

import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NotFoundComponent, ServerErrorComponent, TestErrorsComponent } from './modules/errors';
import { HomeComponent, ListsComponent } from './components';

const routes: Routes = [
   { path: AppRouteNames.ROOT, component: HomeComponent },
   {
      path: AppRouteNames.ROOT,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
         { path: AppRouteNames.MEMBERS, component: MemberListComponent },
         { path: `${AppRouteNames.MEMBERS}/:id`, component: MemberDetailComponent },
         { path: AppRouteNames.LISTS, component: ListsComponent },
         {
            path: AppRouteNames.MEMBER_EDIT,
            component: MemberEditComponent,
            canDeactivate: [PreventUnsavedChangesGuard],
         },
      ],
   },
   { path: AppRouteNames.TEST_ERRORS, component: TestErrorsComponent },
   { path: AppRouteNames.NOT_FOUND, component: NotFoundComponent },
   { path: AppRouteNames.SERVER_ERROR, component: ServerErrorComponent },
   { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
