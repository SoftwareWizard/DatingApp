import { PaginatedResult } from './../../../../core/models/pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
   selector: 'app-member-list',
   templateUrl: './member-list.component.html',
   styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
   page: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
   itemsPerPage = 3;

   constructor(private memberService: MemberService) {}

   async ngOnInit(): Promise<void> {
     await this.loadMembers();
   }

   async loadMembers(): Promise<void> {
      this.page = await this.memberService.getMembers(1, this.itemsPerPage).toPromise();
   }

   async pageChanged($event: PageChangedEvent): Promise<void> {
    this.page = await this.memberService.getMembers($event.page, $event.itemsPerPage).toPromise();
   }

   selectPageSize(size: number): void {
     this.itemsPerPage = size;
     this.loadMembers();
   }
}
