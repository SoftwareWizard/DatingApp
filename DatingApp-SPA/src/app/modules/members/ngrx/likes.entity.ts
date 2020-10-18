import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Like } from '../models/like';
import { LikedPredicateType } from '../services/member.service';

export interface LikesState extends EntityState<Like> {
   likeFilter: LikedPredicateType;
}



export const likesAdapter = createEntityAdapter<Like>({
   selectId: like => `${like.sourceUserId}-${like.likedUserId}`
});

export const initialLikesState = {
   ...likesAdapter.getInitialState(),
   likeFilter: LikedPredicateType.liked,
};

export const {
   selectIds,
   selectEntities,
   selectAll,
   selectTotal,
} = likesAdapter.getSelectors();
