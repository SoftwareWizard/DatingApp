import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../models/member';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root',
})
export class MemberService {
   baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   getMembers(
      page?: number,
      itemsPerPage?: number,
      minAge?: number,
      maxAge?: number,
      gender?: string
   ): Observable<Member[]> {
      let params = new HttpParams();

      if (page !== null && itemsPerPage !== null) {
         params = params.append('pageNumber', page.toString());
         params = params.append('pageSize', itemsPerPage.toString());
      }

      if (minAge) {
         params = params.append('minAge', minAge.toString());
      }

      if (maxAge) {
         params = params.append('maxAge', maxAge.toString());
      }

      if (gender) {
         params = params.append('gender', gender);
      }

      return this.http
         .get<Member[]>(`${this.baseUrl}/users`, { observe: 'response', params })
         .pipe(
            map(response => {
               const result = response.body;
               const headers = response.headers;
               let pagination = null;

               if (headers.get('Pagination') !== null) {
                  pagination = JSON.parse(headers.get('Pagination'));
               }

               return result;
            })
         );
   }

   getMember(id: number): Observable<Member> {
      return this.http.get<Member>(`${this.baseUrl}/users/${id}`);
   }

   getMemberByUsername(username: string): Observable<Member> {
      return this.http.get<Member>(`${this.baseUrl}/users/profile/${username}`);
   }

   updateMember(member: Member): Observable<any> {
      return this.http.put(`${this.baseUrl}/users`, member);
   }

   deletePhoto(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/users/photo/${id}`);
   }

   setMainPhoto(id: number): Observable<any> {
      return this.http.put(`${this.baseUrl}/users/set-main-photo/${id}`, null);
   }
}
