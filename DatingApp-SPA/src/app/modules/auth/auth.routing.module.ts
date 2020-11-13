import { RegisterContainerComponent } from './container/register/register.container';
import { AuthRouteNames } from './auth-routing.names';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: AuthRouteNames.REGISTER, component: RegisterContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
