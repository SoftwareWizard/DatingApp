export interface User {
   id: number;
   username: string;
   token: string;
   photoUrl: string;
   gender: 'male' | 'female';
   roles: string[];
}
