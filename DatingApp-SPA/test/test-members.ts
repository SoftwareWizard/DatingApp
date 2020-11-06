import { Member } from 'src/app/modules/members';

export const TEST_MEMBERS: Member[] = [
   {
      id: 1,
      username: 'testUsername1',
      age: 10,
      knownAs: 'testKnownAs1',
      created: new Date(),
      lastActive: new Date(),
      gender: 'male',
      introduction: 'testIntroduction1',
      interests: 'testInterests1',
      city: 'testCity1',
      country: 'testCountry1',
      photoUrl: 'testPhotoUrl1',
      photos: [],
   },
   {
      id: 2,
      username: 'testUsername2',
      age: 20,
      knownAs: 'testKnownAs2',
      created: new Date(),
      lastActive: new Date(),
      gender: 'male',
      introduction: 'testIntroduction2',
      interests: 'testInterests2',
      city: 'testCity2',
      country: 'testCountry2',
      photoUrl: 'testPhotoUrl2',
      photos: [],
   },
];
