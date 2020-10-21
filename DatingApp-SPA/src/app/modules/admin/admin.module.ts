import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PhotoManagementComponent } from './components/photo-management/photo-management.component';
import { RolesModalComponent } from './components/roles-modal/roles-modal.component';

@NgModule({
   declarations: [AdminPanelComponent, HasRoleDirective, UserManagementComponent, PhotoManagementComponent, RolesModalComponent],
   imports: [CommonModule, AdminRoutingModule, TabsModule, ModalModule.forRoot()],
   exports: [HasRoleDirective]
})
export class AdminModule {}
