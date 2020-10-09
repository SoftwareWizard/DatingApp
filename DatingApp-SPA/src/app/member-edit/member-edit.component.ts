import { ToastrService } from 'ngx-toastr';
import { MemberService } from './../services/member.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../models/member';
import { NgForm } from '@angular/forms';

@Component({
   selector: 'app-member-edit',
   templateUrl: './member-edit.component.html',
   styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
   @ViewChild('editForm') editForm: NgForm;
   member: Member;
   username: string;
   @HostListener('window:beforeunload', ['$event']) _ = ($event: any) => this.onUnload($event);

   constructor(private memberService: MemberService, private toastr: ToastrService) {}

   async ngOnInit(): Promise<void> {
      this.username = JSON.parse(localStorage.getItem('user'))?.username;
      this.member = await this.memberService.getMemberByUsername(this.username).toPromise();
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
