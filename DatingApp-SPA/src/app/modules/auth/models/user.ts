export interface User {
   id: number;
   userName: string;
   token: string;
   photoUrl: string;
   gender: 'male' | 'female';
   roles: string[];
}
