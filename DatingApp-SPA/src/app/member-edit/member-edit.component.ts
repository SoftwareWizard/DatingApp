import { ToastrService } from 'ngx-toastr';
import { MemberService } from './../services/member.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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

   constructor(private memberService: MemberService, private toastr: ToastrService) {}

   async ngOnInit(): Promise<void> {
      this.username = JSON.parse(localStorage.getItem('user'))?.username;
      this.member = await this.memberService.getMemberByUsername(this.username).toPromise();
   }

   updateMember(): void {
      this.editForm.reset(this.member);
      this.toastr.success('Profile updated.');
   }
}
