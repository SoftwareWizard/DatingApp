import { AdminGuard } from './modules/admin/guards/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteNames } from './app-routing.names';

import {
   NotFoundComponent,
   ServerErrorComponent,
   TestErrorsComponent,
} from './modules/errors';
import { AuthGuard } from './modules/auth';
import {
   HomeContainerComponent,
   LikesContainerComponent,
} from './core/container';

const routes: Routes = [
   { path: AppRouteNames.ROOT, component: HomeContainerComponent },
   {
      path: AppRouteNames.MEMBERS,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      loadChildren: './modules/members/members.module#MembersModule',
   },
   {
      path: AppRouteNames.MESSAGES,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      loadChildren: './modules/message/message.module#MessageModule',
   },
   {
      path: AppRouteNames.AUTH,
      loadChildren: './modules/auth/auth.module#AuthModule',
   },
   {
      path: AppRouteNames.LIKES,
      component: LikesContainerComponent,
      canActivate: [AuthGuard],
   },
   { path: AppRouteNames.TEST_ERRORS, component: TestErrorsComponent },
   { path: AppRouteNames.NOT_FOUND, component: NotFoundComponent },
   { path: AppRouteNames.SERVER_ERROR, component: ServerErrorComponent },
   {
      path: AppRouteNames.ADMIN,
      canActivate: [AdminGuard],
      loadChildren: () =>
         import('./modules/admin/admin.module').then(m => m.AdminModule),
   },
   { path: '**', component: HomeContainerComponent, pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes, {})],
   exports: [RouterModule],
})
export class AppRoutingModule {}
