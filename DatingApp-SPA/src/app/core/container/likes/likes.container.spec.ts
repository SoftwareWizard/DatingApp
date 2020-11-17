import { LikesComponent } from './../../components/likes/likes.component';
import { MockComponent, ngMocks } from 'ng-mocks';
import { LikedPredicateType } from 'src/app/modules/members/models/likedPredicate.type';
import {
   Spectator,
   createComponentFactory,
   SpyObject,
} from '@ngneat/spectator';
import { LikesContainerComponent } from './likes.container';
import { LikeService } from 'src/app/modules/members';
import { of } from 'rxjs';
import { TEST_MEMBERS } from 'test/test-data/test-members';

describe('LikesContainer', () => {
   let spectator: Spectator<LikesContainerComponent>;
   let likeServiceSpy: SpyObject<LikeService>;
   let likesComponentMock: LikesComponent;

   const createComponent = createComponentFactory({
      component: LikesContainerComponent,
      declarations: [MockComponent(LikesComponent)],
      mocks: [LikeService],
   });

   beforeEach(() => {
      spectator = createComponent();
      likeServiceSpy = spectator.inject(LikeService);
      likesComponentMock = ngMocks.find<LikesComponent>(
         spectator.fixture,
         'app-likes'
      ).componentInstance;
   });

   it('should be created', async () => {
      likeServiceSpy.getLikes.and.returnValue(of([]));
      expect(spectator.component).toBeTruthy();
   });

   describe('loadLikes', () => {
      it('should pass members', async () => {
         likeServiceSpy.getLikes.and.returnValue(of(TEST_MEMBERS));
         await spectator.component.loadLikes();
         await spectator.fixture.whenStable();
         spectator.detectComponentChanges();
         expect(likesComponentMock.members).toBe(TEST_MEMBERS);
      });
   });

   describe('onPredicateChanged', () => {
      it('should update members when predicateChanged', async () => {
         const testEvent = LikedPredicateType.likedBy;
         likeServiceSpy.getLikes.and.returnValue(of([]));
         spectator.detectComponentChanges();

         expect(spectator.component.members).toEqual([]);

         likeServiceSpy.getLikes.and.returnValue(of(TEST_MEMBERS));
         likesComponentMock.predicateChanged.emit(testEvent);
         await spectator.fixture.whenStable();
         spectator.detectComponentChanges();

         expect(likeServiceSpy.getLikes).toHaveBeenCalledWith(testEvent);
         expect(spectator.component.members).toEqual(TEST_MEMBERS);
      });
   });
});
