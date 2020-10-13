import { MemberService } from './../../modules/members/services/member.service';
import { Component, OnInit } from '@angular/core';
import { LikedPredicateType, Member } from 'src/app/modules/members';

@Component({
   selector: 'app-lists',
   templateUrl: './lists.component.html',
   styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
   members: Partial<Member[]>;
   predicate: LikedPredicateType = LikedPredicateType.liked;
   predicateTexts: Map<LikedPredicateType, string> = new Map<LikedPredicateType, string>([
      [LikedPredicateType.liked, 'Members I Like'],
      [LikedPredicateType.likedBy, 'Members who like me'],
   ]);

   constructor(private memberService: MemberService) {
   }

   async ngOnInit(): Promise<void> {
     await this.loadLikes();
   }

   async loadLikes(): Promise<void> {
      this.members = await this.memberService.getLikes(this.predicate).toPromise();
   }

   get LikedPredicateType(): typeof LikedPredicateType {
      return LikedPredicateType;
   }

   get LikedPredicateTypes(): string[] {
      return Object.keys(LikedPredicateType);
   }
}
