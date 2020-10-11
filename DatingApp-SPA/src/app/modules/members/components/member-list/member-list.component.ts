import { PaginatedResult } from './../../../../core/models/pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
   selector: 'app-member-list',
   templateUrl: './member-list.component.html',
   styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
   page: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

   constructor(private memberService: MemberService) {}

   async ngOnInit(): Promise<void> {
     await this.loadMembers();
   }

   async loadMembers(): Promise<void> {
      this.page = await this.memberService.getMembers(1, 4).toPromise();
   }
}
