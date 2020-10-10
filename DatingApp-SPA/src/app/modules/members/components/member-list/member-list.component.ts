import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
   selector: 'app-member-list',
   templateUrl: './member-list.component.html',
   styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
   members: Member[];

   constructor(private memberService: MemberService) {}

   async ngOnInit(): Promise<void> {
     await this.loadMembers();
   }

   async loadMembers(): Promise<void> {
      this.members = await this.memberService.getMembers().toPromise();
   }
}
