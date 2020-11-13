import { Spectator } from '@ngneat/spectator';
import { RegisterComponent } from 'src/app/modules/auth/components/register/register.component';
import { RegisterModel } from 'src/app/modules/auth/models/register.model';
import { PageObjectBase } from './base.po';
enum CssSelectors {
   RADIO_MALE = 'input#gender-male',
   RADIO_FEMALE = 'input#gender-female',
   INPUT_USERNAME = '#username',
   INPUT_KNOWNAS = '#knownAs',
   INPUT_DATEOFBIRTH = '#dateOfBirth',
   INPUT_CITY = '#city',
   INPUT_COUNTRY = '#country',
   INPUT_PASSWORD = '#password',
   INPUT_CONFIRMPASSWORD = '#confirmPassword',
   BTN_REGISTER = '#btnRegister',
   BTN_CANCEL = '#btnCancel',
}

enum Outputs {
   REGISTER = 'register',
}

export class RegisterComponentPageObject extends PageObjectBase<
   RegisterComponent
> {
   get registerButton(): HTMLButtonElement {
      return this.getElement(CssSelectors.BTN_REGISTER);
   }
   get cancelButton(): HTMLButtonElement {
      return this.getElement(CssSelectors.BTN_CANCEL);
   }

   output = {
      register: null as RegisterModel,
   };

   constructor(spectator: Spectator<RegisterComponent>) {
      super(spectator);

      this.spectator
         .output(Outputs.REGISTER)
         .subscribe((result: RegisterModel) => (this.output.register = result));
   }

   clickRegister(): void {
      this.spectator.click(this.registerButton);
   }

   clickCancel(): void {
      this.spectator.click(this.cancelButton);
   }
}
