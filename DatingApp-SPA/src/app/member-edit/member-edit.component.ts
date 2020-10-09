import { MemberService } from './../services/member.service';
import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';

@Component({
   selector: 'app-member-edit',
   templateUrl: './member-edit.component.html',
   styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
   member: Member;
   username: string;

   constructor(private memberService: MemberService) {}

   async ngOnInit(): Promise<void> {
      this.username = JSON.parse(localStorage.getItem('user'))?.username;
      this.member = await this.memberService.getMemberByUsername(this.username).toPromise();
   }
}
