import { MembersFacade } from './../../ngrx/members.facade';
import { Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'app-member-filter',
   templateUrl: './member-filter.component.html',
   styleUrls: ['./member-filter.component.css'],
})
export class MemberFilterComponent implements OnInit {
   @Input() minAge: number;
   @Input() maxAge: number;

   private items = Array.from({ length: 16 }, (v, k) => 20 + k * 5);
   ages: number[] = [18];

   constructor(private membersFacade: MembersFacade) {
      this.ages.push(...this.items);
   }

   ngOnInit(): void {}

   changeFilter(): void {
      this.membersFacade.changeFilter.dispatch({ minAge: this.minAge, maxAge: this.maxAge });
   }
}
