import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HasRoleDirective } from './directives/has-role.directive';

@NgModule({
   declarations: [AdminPanelComponent, HasRoleDirective],
   imports: [CommonModule, AdminRoutingModule],
   exports: [HasRoleDirective]
})
export class AdminModule {}
