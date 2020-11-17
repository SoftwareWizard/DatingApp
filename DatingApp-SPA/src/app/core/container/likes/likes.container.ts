import { LikedPredicateType } from './../../../modules/members/models/likedPredicate.type';
import { LikeService } from './../../../modules/members/services/like.service';
import { Member } from './../../../modules/members/models/member';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
   templateUrl: './likes.container.html',
   changeDetection: ChangeDetectionStrategy.OnPush
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
