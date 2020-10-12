import { MemberService } from './../../services/member.service';
import { AppRouteNames } from 'src/app/app-routing.names';
import { Member } from '../../models/member';
import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-member-card',
   templateUrl: './member-card.component.html',
   styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
   ROUTES = AppRouteNames;
   @Input() member: Member;
   isLike: boolean;

   constructor(private memberService: MemberService) {}

   ngOnInit(): void {}

   async onChangeLike(username: string): Promise<void> {
      if (this.isLike) {
        await this.memberService.addLike(username).toPromise();
      } else {
        await this.memberService.removeLike(username).toPromise();
      }
   }
}
