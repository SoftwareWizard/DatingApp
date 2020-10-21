import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/auth';

@Component({
   selector: 'app-user-management',
   templateUrl: './user-management.component.html',
   styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
   users: Partial<User[]>;

   constructor(private adminService: AdminService) {}

   async ngOnInit(): Promise<void> {
      this.users = await this.adminService.getUsersWithRoles().toPromise();
   }
}
