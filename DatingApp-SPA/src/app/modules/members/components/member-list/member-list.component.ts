import { AuthFacade } from './../../../auth/ngrx/auth.facade';
import { Observable, Subscription } from 'rxjs';
import { MembersFacade } from './../../ngrx/members.facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
   selector: 'app-member-list',
   templateUrl: './member-list.component.html',
   styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
   //  page: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
   members$: Observable<Member[]>;
   gender: 'male' | 'female';
   genderSub: Subscription;

   //  itemsPerPage = 5;

   minAge$: Observable<number>;
   maxAge$: Observable<number>;

   constructor(private membersFacade: MembersFacade, private authFacade: AuthFacade) {
      this.members$ = this.membersFacade.select.filteredMembers;

      this.minAge$ = this.membersFacade.select.minAge;
      this.maxAge$ = this.membersFacade.select.maxAge;
      this.genderSub = this.authFacade.select.gender.subscribe(item => (this.gender = item));
   }

   async ngOnInit(): Promise<void> {
      this.membersFacade.loadMembers.dispatch({ gender: this.gender });
   }

   ngOnDestroy(): void {
      this.genderSub.unsubscribe();
   }

   //  async loadMembers(): Promise<void> {
   // this.page = await this.memberService
   //    .getMembers(1, this.itemsPerPage, this.minAge, this.maxAge, this.gender)
   //    .toPromise();
   //  }

   //  async pageChanged($event: PageChangedEvent): Promise<void> {
   //     this.page = await this.memberService
   //        .getMembers($event.page, $event.itemsPerPage, this.minAge, this.maxAge, this.gender)
   //        .toPromise();
   //  }

   //  async selectPageSize(size: number): Promise<void> {
   //     this.itemsPerPage = size;
   //     // await this.loadMembers();
   //  }
}
