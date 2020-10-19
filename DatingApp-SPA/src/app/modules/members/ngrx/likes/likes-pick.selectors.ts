import { createSelector } from '@ngrx/store';
import { allLikeIds } from './likes.selectors';

export const isLike = createSelector(
   allLikeIds,
   (likes: string[], props: { userId: number; memberId: number }) => {
      const key = `${props.userId}-${props.memberId}`;
      return likes.includes(key);
   }
);
