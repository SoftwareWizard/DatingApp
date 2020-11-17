import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { RegisterModel } from 'src/app/modules/auth/models/register.model';

export const TEST_REGISTER_MODEL = {
   username: 'testUsername',
   password: 'testPassword',
   city: 'testCity',
   country: 'testCountry',
   gender: 'male',
   knownAs: 'testKnownAs',
   dateOfBirth: new Date(),
} as RegisterModel;
