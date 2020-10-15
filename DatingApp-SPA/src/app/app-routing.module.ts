import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppRouteNames } from './app-routing.names';
import { AuthGuard } from './core';

import { NotFoundComponent, ServerErrorComponent, TestErrorsComponent } from './modules/errors';
import { HomeComponent, ListsComponent } from './components';

const routes: Routes = [
   { path: AppRouteNames.ROOT, component: HomeComponent },
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
   { path: AppRouteNames.LISTS, component: ListsComponent },
   //   { path: AppRouteNames.REGISTER, component: RegisterComponent },
   { path: AppRouteNames.TEST_ERRORS, component: TestErrorsComponent },
   { path: AppRouteNames.NOT_FOUND, component: NotFoundComponent },
   { path: AppRouteNames.SERVER_ERROR, component: ServerErrorComponent },
   { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, {
         preloadingStrategy: PreloadAllModules,
      }),
   ],
   exports: [RouterModule],
})
export class AppRoutingModule {}
