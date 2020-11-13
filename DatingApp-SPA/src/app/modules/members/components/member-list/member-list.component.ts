import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { take, map } from 'rxjs/operators';
import { AuthFacade } from './../../../auth/store/auth.facade';
import { MembersFacade } from '../../ngrx/members/members.facade';
import { LikesFacade } from '../../ngrx/likes/likes.facade';

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
   userId$: Observable<number>;

   constructor(
      private authFacade: AuthFacade,
      private membersFacade: MembersFacade,
      private likesFacade: LikesFacade
   ) {
      this.userId$ = this.authFacade.select.user.pipe(map(user => user?.id));
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
      this.likesFacade.loadLikes.dispatch();
   }
}
