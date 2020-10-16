import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/auth';

const KEY_USER = 'user';

@Injectable({
   providedIn: 'root',
})
export class LocalStorageService {
   constructor() {}

   getUser(): User {
      const userAsJson = localStorage.getItem(KEY_USER);

      if (!userAsJson) {
         return null;
      }

      return JSON.parse(userAsJson);
   }

   setUser(user: User): void {
      localStorage.setItem(KEY_USER, JSON.stringify(user));
   }

   removeUser(): void {
      localStorage.removeItem(KEY_USER);
   }
}
