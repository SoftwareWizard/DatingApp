import { AuthFacade } from './../../../auth/store/auth.facade';
import { Member } from '../../models/member';
import { ToastrService } from 'ngx-toastr';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
   selector: 'app-member-edit',
   templateUrl: './member-edit.component.html',
   styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
   @ViewChild('editForm') editForm: NgForm;
   member: Member;
   @HostListener('window:beforeunload', ['$event']) _ = ($event: any) => this.onUnload($event);

   constructor(
      private memberService: MemberService,
      private authFacade: AuthFacade,
      private toastr: ToastrService
   ) {}

   async ngOnInit(): Promise<void> {
      const user = await this.authFacade.select.user.pipe(take(1)).toPromise();
      this.member = await this.memberService.getMemberByUsername(user?.userName).toPromise();
   }

   async updateMember(): Promise<void> {
      try {
         await this.memberService.updateMember(this.member).toPromise();
         this.editForm.reset(this.member);
         this.toastr.success('Profile updated.');
      } catch (error) {
         this.toastr.error(error.message);
      }
   }

   onUnload($event: any): void {
      if (this.editForm.dirty) {
         $event.returnValue = true;
      }
   }
}
