import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';

export class AppRoutes {
   public static ROOT = '';
   public static MEMBERS = 'members';
   public static LISTS = 'lists';
   public static MESSAGES = 'messages';
   public static TEST_ERRORS = 'test-errors';
}

const routes: Routes = [
   { path: AppRoutes.ROOT, component: HomeComponent },
   {
      path: AppRoutes.ROOT,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
         { path: AppRoutes.MEMBERS, component: MemberListComponent },
         { path: `${AppRoutes.MEMBERS}/:id`, component: MemberDetailComponent },
         { path: AppRoutes.LISTS, component: ListsComponent },
         { path: AppRoutes.MESSAGES, component: MessagesComponent },
      ],
   },
   { path: AppRoutes.TEST_ERRORS, component: TestErrorsComponent },
   { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
