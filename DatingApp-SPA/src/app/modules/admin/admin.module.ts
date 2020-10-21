import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PhotoManagementComponent } from './components/photo-management/photo-management.component';

@NgModule({
   declarations: [AdminPanelComponent, HasRoleDirective, UserManagementComponent, PhotoManagementComponent],
   imports: [CommonModule, AdminRoutingModule],
   exports: [HasRoleDirective]
})
export class AdminModule {}
