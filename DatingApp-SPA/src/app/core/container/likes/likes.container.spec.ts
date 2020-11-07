import { LikedPredicateType } from 'src/app/modules/members/models/likedPredicate.type';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { LikesContainerComponent } from './likes.container';
import { LikeService } from 'src/app/modules/members';
import { of } from 'rxjs';
import { TEST_MEMBERS } from 'test/test-data/test-members';

describe('LikesContainerComponent', () => {
   let spectator: Spectator<LikesContainerComponent>;
   const createComponent = createComponentFactory({
      component: LikesContainerComponent,
      mocks: [LikeService],
   });

   beforeEach(() => (spectator = createComponent()));

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   describe('loadLikes', () => {
      it('should return members', async () => {
         const likeServiceSpy = spectator.inject(LikeService);
         likeServiceSpy.getLikes.and.returnValue(of(TEST_MEMBERS));

         await spectator.component.loadLikes();
         const result = spectator.component.members;
         expect(result.length).toBe(TEST_MEMBERS.length);
         expect(likeServiceSpy.getLikes).toHaveBeenCalledWith(
            LikedPredicateType.liked
         );
      });
   });

   describe('onPredicateChanged', () => {
      it('should return members', async () => {
         const likeServiceSpy = spectator.inject(LikeService);
         likeServiceSpy.getLikes.and.returnValue(of(TEST_MEMBERS));

         await spectator.component.onPredicateChanged(
            LikedPredicateType.likedBy
         );

         const result = spectator.component.members;
         expect(result.length).toBe(TEST_MEMBERS.length);
         expect(likeServiceSpy.getLikes).toHaveBeenCalledWith(
            LikedPredicateType.likedBy
         );
      });
   });
});
