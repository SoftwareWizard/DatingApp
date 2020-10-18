import { AuthFacade } from './../../../auth/ngrx/auth.facade';
import { Observable, Subscription } from 'rxjs';
import { MemberFacade } from '../../ngrx/member.facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { last, take } from 'rxjs/operators';
import { collectExternalReferences } from '@angular/compiler';

@Component({
   selector: 'app-member-list',
   templateUrl: './member-list.component.html',
   styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
   members$: Observable<Member[]>;
   gender: 'male' | 'female';
   genderSub: Subscription;

   minAge$: Observable<number>;
   maxAge$: Observable<number>;
   itemsPerPage$: Observable<number>;
   currentPage$: Observable<number>;
   totalItems$: Observable<number>;

   constructor(private membersFacade: MemberFacade, private authFacade: AuthFacade) {
      this.members$ = this.membersFacade.select.paginatedMembers;
      this.minAge$ = this.membersFacade.select.minAge;
      this.maxAge$ = this.membersFacade.select.maxAge;
      this.itemsPerPage$ = this.membersFacade.select.itemsPerPage;
      this.currentPage$ = this.membersFacade.select.currentPage;
      this.totalItems$ = this.membersFacade.select.totalItems;
   }

   async ngOnInit(): Promise<void> {
      this.gender = await this.authFacade.select.gender.pipe(take(1)).toPromise();
      this.gender = this.gender === 'male' ? 'female' : 'male';
      this.membersFacade.loadMembers.dispatch({ gender: this.gender });
      this.membersFacade.loadLikes.dispatch();
   }
}
