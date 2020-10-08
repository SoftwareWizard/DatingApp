import { Photo } from './photo';

export interface Member {
   id: number;
   username: string;
   age: number;
   knownAs: string;
   created: Date;
   lastActive: Date;
   gender: 'male' | 'female';
   introduction: string;
   looking?: any;
   interests: string;
   city: string;
   country: string;
   photoUrl: string;
   photos: Photo[];
}
