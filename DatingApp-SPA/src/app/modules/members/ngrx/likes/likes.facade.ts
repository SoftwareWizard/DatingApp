import {
   bindSelectors,
   createDuck,
   dispatch,
   getReducer,
   StoreFacade,
   usePick,
} from '@ngrx-ducks/core';
import * as likesSelectors from './likes.selectors';
import { Like } from '../../models/like';
import { initialLikesState, likesAdapter, LikesState } from './likes.entity';

@StoreFacade()
export class LikesFacade {
   select = bindSelectors(likesSelectors);
   pick = usePick();

   loadLikes = createDuck('[Member List Page] Load Likes');

   loadLikesSuccess = createDuck(
      '[Effect] Load Likes Success',
      (state: LikesState, payload: Like[]) => likesAdapter.setAll(payload, state)
   );

   loadLikesFailure = createDuck('[Effect] Load Likes Failure', dispatch<{ error: any }>());

   setLike = createDuck('[Member Card] Set Like', dispatch<{ userId: number; memberId: number }>());

   setLikeSuccess = createDuck('[Effect] Set Like Success', (state: LikesState, payload: Like[]) =>
      likesAdapter.setAll(payload, state)
   );

   setLikeFailure = createDuck('[Effect] Set Like Failure', dispatch<{ error: any }>());

   unsetLike = createDuck(
      '[Member Card] Unset Like',
      dispatch<{ userId: number; memberId: number }>()
   );

   unsetLikeSuccess = createDuck(
      '[Effect] UnsSet Like Success',
      (state: LikesState, payload: Like[]) => likesAdapter.setAll(payload, state)
   );

   unsetLikeFailure = createDuck('[Effect] Unset Like Failure', dispatch<{ error: any }>());
}

export const likesReducer = getReducer(initialLikesState, LikesFacade);
export * from './likes-pick.selectors';
