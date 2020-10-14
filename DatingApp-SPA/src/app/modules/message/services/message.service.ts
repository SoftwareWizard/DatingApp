import { Message } from '../models/message';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export enum containerType {
   unread = 'unread',
   inbox = 'inbox',
   outbox = 'outbox',
}

@Injectable({
   providedIn: 'root',
})
export class MessageService {
   baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   getMessages(container: containerType): Observable<PaginatedResult<Message[]>> {
      let params = new HttpParams();
      params = params.append('container', container);

      return this.http
         .get<Message[]>(`${this.baseUrl}/messages`, { observe: 'response', params })
         .pipe(
            map(response => {
               const result = response.body;
               const headers = response.headers;
               let pagination = null;

               if (headers.get('Pagination') !== null) {
                  pagination = JSON.parse(headers.get('Pagination'));
               }

               return {
                  result,
                  pagination,
               };
            })
         );
   }

   getMessageThread(username: string): Observable<PaginatedResult<Message[]>> {
      return this.http
         .get<Message[]>(`${this.baseUrl}/messages/thread/${username}`, { observe: 'response' })
         .pipe(
            map(response => {
               const result = response.body;
               const headers = response.headers;
               let pagination = null;

               if (headers.get('Pagination') !== null) {
                  pagination = JSON.parse(headers.get('Pagination'));
               }

               return {
                  result,
                  pagination,
               };
            })
         );
   }

   sendMessage(username: string, messageText: string): Observable<any> {
      const message = {
         recipientUsername: username,
         content: messageText,
      } as Message;

      return this.http.post(`${this.baseUrl}/messages`, message);
   }
}
