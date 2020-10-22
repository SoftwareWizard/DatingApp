import { isOnline } from './../../ngrx/online/online-pick.selectors';
import { OnlineFacade } from './../../ngrx/online/online.facade';
import { isLike, LikesFacade } from '../../ngrx/likes/likes.facade';
import { Observable, of } from 'rxjs';
import { AppRouteNames } from 'src/app/app-routing.names';
import { Member } from '../../models/member';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
   selector: 'app-member-card',
   templateUrl: './member-card.component.html',
   styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
   ROUTES = AppRouteNames;
   @Input() member: Member;
   @Input() userId: number;

   isLike$: Observable<boolean>;
   isOnline$: Observable<boolean>;

   constructor(private likesFacade: LikesFacade, private onlineFacade: OnlineFacade) {}

   ngOnInit(): void {
      this.isLike$ = this.likesFacade.pick(isLike, {
         userId: this.userId,
         memberId: this.member?.id,
      });

      this.isOnline$ = this.onlineFacade.pick(isOnline, { username: this.member.username });
   }

   async onChangeLike(): Promise<void> {
      const currentIsLike = await this.isLike$.pipe(take(1)).toPromise();
      const payload = { userId: this.userId, memberId: this.member.id };

      if (currentIsLike) {
         this.likesFacade.unsetLike.dispatch(payload);
      } else {
         this.likesFacade.setLike.dispatch(payload);
      }
   }
}
