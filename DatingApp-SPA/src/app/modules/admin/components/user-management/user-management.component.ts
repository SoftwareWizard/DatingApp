import { RolesModalComponent } from './../roles-modal/roles-modal.component';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/auth';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
   selector: 'app-user-management',
   templateUrl: './user-management.component.html',
   styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
   users: Partial<User[]>;
   bsModalRef: BsModalRef;

   constructor(private adminService: AdminService, private modalService: BsModalService) {}

   async ngOnInit(): Promise<void> {
      this.users = await this.adminService.getUsersWithRoles().toPromise();
   }

   openRolesModal(user: User): void {
      const options = {
         class: 'modal-dialog-centered',
         initialState: {
            user,
            roles: this.getRolesArray(user),
         },
      } as ModalOptions;

      this.bsModalRef = this.modalService.show(RolesModalComponent, options);
      this.bsModalRef.content.updateSelectedRoles.subscribe(values => {

      });
   }

   private getRolesArray(user: User): any {
      const roles = [];
      const userRoles = user.roles;

      const availableRoles: any[] = [
         { name: 'Admin', value: 'Admin' },
         { name: 'Moderator', value: 'Moderator' },
         { name: 'Member', value: 'Member' },
      ];

      availableRoles.forEach(role => {
         let isMatch = false;

         for (const userRole of userRoles) {
            if (role.name === userRole) {
               isMatch = true;
               role.checked = true;
               roles.push(role);
               break;
            }
         }

         if (!isMatch) {
            role.checked = false;
            roles.push(role);
         }
      });

      return roles;
   }
}
