import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LikeService, Member } from 'src/app/modules/members';
import { LikedPredicateType } from 'src/app/modules/members/models/likedPredicate.type';

@Component({
   templateUrl: './likes.container.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikesContainerComponent implements OnInit {
   members: Partial<Member[]> = [];
   constructor(private likeService: LikeService) {}

   async ngOnInit(): Promise<void> {
      await this.loadLikes();
   }

   async loadLikes(): Promise<void> {
      this.members = await this.likeService
         .getLikes(LikedPredicateType.liked)
         .toPromise();
   }

   async onPredicateChanged(predicate: LikedPredicateType): Promise<void> {
      this.members = await this.likeService.getLikes(predicate).toPromise();
   }
}
