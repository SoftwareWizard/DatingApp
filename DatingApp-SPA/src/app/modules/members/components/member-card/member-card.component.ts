import { Member } from '../../models/member';
import { Component, Input, OnInit } from '@angular/core';
import { MembersRouteNames } from '../../members-routing.names';

@Component({
   selector: 'app-member-card',
   templateUrl: './member-card.component.html',
   styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  ROUTES = MembersRouteNames;
  @Input() member: Member;

   constructor() {}

   ngOnInit(): void {}
}
