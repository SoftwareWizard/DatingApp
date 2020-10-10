import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member';

@Injectable({
   providedIn: 'root',
})
export class MemberService {
   baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   getMembers(): Observable<Member[]> {
      return this.http.get<Member[]>(`${this.baseUrl}/users`);
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
