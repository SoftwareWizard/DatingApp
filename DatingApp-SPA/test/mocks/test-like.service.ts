import { Observable, of } from 'rxjs';
import { Member } from 'src/app/modules/members';
import { Like } from 'src/app/modules/members/models/like';
import { LikedPredicateType } from 'src/app/modules/members/models/likedPredicate.type';
import { asyncData } from 'test/helper/async-observable-helper';
import { TEST_MEMBERS } from 'test/test-data/test-members';

export class TestLikeService {
   addLikeId(likedId: number): Observable<any> {
      return of(null);
   }

   removeLikeId(likedId: number): Observable<any> {
      return of(null);
   }

   getAllLikeIds(): Observable<Like[]> {
      return of([]);
   }

   getLikes(predicate: LikedPredicateType): Observable<Member[]> {
      return asyncData(TEST_MEMBERS);
   }
}
