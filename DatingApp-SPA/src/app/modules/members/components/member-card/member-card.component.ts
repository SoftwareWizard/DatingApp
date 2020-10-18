import { isLike, MemberFacade } from './../../ngrx/member.facade';
import { Observable } from 'rxjs';
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

   constructor(private memberFacade: MemberFacade) {}

   ngOnInit(): void {
      this.isLike$ = this.memberFacade.pick(isLike, {
         userId: this.userId,
         memberId: this.member?.id,
      });
   }

   async onChangeLike(): Promise<void> {
      const currentIsLike = await this.isLike$.pipe(take(1)).toPromise();
      const payload = { userId: this.userId, memberId: this.member.id };

      if (currentIsLike) {
         this.memberFacade.unsetLike.dispatch(payload);
      } else {
         this.memberFacade.setLike.dispatch(payload);
      }
   }
}
