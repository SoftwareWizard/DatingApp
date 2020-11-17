import {
   Component,
   Input,
   OnInit,
   Output,
   EventEmitter,
   ChangeDetectionStrategy,
} from '@angular/core';
import { Member } from 'src/app/modules/members';
import { LikedPredicateType } from 'src/app/modules/members/models/likedPredicate.type';

@Component({
   selector: 'app-likes',
   templateUrl: './likes.component.html',
   styleUrls: ['./likes.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikesComponent {
   @Input() members: Partial<Member[]> = [];
   @Output() predicateChanged = new EventEmitter<LikedPredicateType>();

   selectedPredicate: LikedPredicateType = LikedPredicateType.liked;

   predicateTexts: Map<LikedPredicateType, string> = new Map<
      LikedPredicateType,
      string
   >([
      [LikedPredicateType.liked, 'Members I Like'],
      [LikedPredicateType.likedBy, 'Members who like me'],
   ]);

   onPredicateChanged(): void {
      this.predicateChanged.emit(this.selectedPredicate);
   }

   get LikedPredicateType(): typeof LikedPredicateType {
      return LikedPredicateType;
   }

   get LikedPredicateTypes(): string[] {
      return Object.keys(LikedPredicateType);
   }

   get headerText(): string {
      return this.selectedPredicate === LikedPredicateType.liked
         ? this.predicateTexts.get(LikedPredicateType.liked)
         : this.predicateTexts.get(LikedPredicateType.likedBy);
   }
}
