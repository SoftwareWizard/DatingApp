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

   constructor() {}

   ngOnInit(): void {}
}
