import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AppRouteNames } from './app-routing.names';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

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
         { path: AppRouteNames.MESSAGES, component: MessagesComponent },
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
