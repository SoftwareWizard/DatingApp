import { MembersFacade } from '../../ngrx/members.facade';
import { Component, Input, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
   selector: 'app-member-paginator',
   templateUrl: './member-paginator.component.html',
   styleUrls: ['./member-paginator.component.css'],
})
export class MemberPaginatorComponent implements OnInit {
   @Input() totalItems: number;
   @Input() currentPage: number;
   @Input() itemsPerPage = 5;

   constructor(private membersFacade: MembersFacade) {}

   ngOnInit(): void {}

   pageChanged($event: PageChangedEvent): void {
      this.currentPage = $event.page;
      this.changePagination();
   }

   selectPageSize(size: number): void {
      this.itemsPerPage = size;
      this.changePagination();
   }

   changePagination(): void {
      this.membersFacade.changePagination.dispatch({
         itemsPerPage: this.itemsPerPage,
         currentPage: this.currentPage,
      });
   }
}
