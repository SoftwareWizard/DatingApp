import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like';
import { LikedPredicateType } from '../models/likedPredicate.type';
import { Member } from '../models/member';

@Injectable({
   providedIn: 'root',
})
export class LikeService {
   baseUrl = environment.apiUrl;
   constructor(private http: HttpClient) {}

   addLikeId(likedId: number): Observable<any> {
      return this.http.put(`${this.baseUrl}/likes/ids/${likedId}`, {});
   }

   removeLikeId(likedId: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/likes/ids/${likedId}`);
   }

   getAllLikeIds(): Observable<Like[]> {
      return this.http.get<Like[]>(`${this.baseUrl}/likes/ids`);
   }

   getLikes(predicate: LikedPredicateType): Observable<Member[]> {
      let params = new HttpParams();
      params = params.append('predicate', predicate);
      return this.http.get<Member[]>(`${this.baseUrl}/likes`, { params });
   }
}
