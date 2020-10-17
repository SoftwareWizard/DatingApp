import { AuthFacade } from './../../../auth/ngrx/auth.facade';
import { Observable, Subscription } from 'rxjs';
import { MembersFacade } from './../../ngrx/members.facade';
import { PaginatedResult } from './../../../../core/models/pagination';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
   selector: 'app-member-list',
   templateUrl: './member-list.component.html',
   styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
   //  page: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
   members$: Observable<Member[]>;
   //  gender$: Observable<'male' | 'female'>;
   gender: 'male' | 'female';
   genderSub: Subscription;

   //  itemsPerPage = 5;
   //  gender: 'male' | 'female' = 'male';
   //  genders = ['male', 'female'];

   //  minAge = 18;
   //  maxAge = 95;
   //  private items = Array.from({ length: 16 }, (v, k) => 20 + k * 5);
   //  ages: number[] = [18];

   constructor(
      private membersFacade: MembersFacade,
      private authFacade: AuthFacade // private memberService: MemberService
   ) {
      // this.ages.push(...this.items);
      this.members$ = this.membersFacade.select.allMembers;
      this.genderSub = this.authFacade.select.gender.subscribe(item => (this.gender = item));
   }

   async ngOnInit(): Promise<void> {
      this.membersFacade.loadMembers.dispatch({ gender: this.gender });
      // await this.loadMembers();
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
