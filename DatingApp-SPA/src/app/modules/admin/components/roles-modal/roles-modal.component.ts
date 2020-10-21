import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/modules/auth';

@Component({
   selector: 'app-roles-modal',
   templateUrl: './roles-modal.component.html',
   styleUrls: ['./roles-modal.component.css'],
})
export class RolesModalComponent implements OnInit {
   @Input() updateSelectedRoles = new EventEmitter<any[]>();
   user: User;
   roles: any[];

   constructor(public bsModalRef: BsModalRef) {}

   ngOnInit(): void {}

   updateRoles(): void {
      this.updateSelectedRoles.emit(this.roles);
   }
}
