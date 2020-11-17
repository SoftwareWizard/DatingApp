import { TEST_REGISTER_MODEL } from './../../../../../../test/test-data/test-register-model';
import { RegisterComponentPageObject } from './../../../../../../test/page-objects/register.component.po';
import { TextInputComponent } from './../text-input/text-input.component';
import { SharedModule } from './../../../shared/shared.module';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RegisterComponent } from './register.component';
import { waitForAsync } from '@angular/core/testing';

xdescribe('RegisterComponent', () => {
   let spectator: Spectator<RegisterComponent>;
   let pageObject: RegisterComponentPageObject;

   const createComponent = createComponentFactory({
      component: RegisterComponent,
      declarations: [TextInputComponent],
      imports: [SharedModule],
   });

   beforeEach(() => {
      spectator = createComponent();
      pageObject = new RegisterComponentPageObject(spectator);
   });

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it(
      'should pass RegisterModel for onRegister',
      waitForAsync(async () => {
         spectator.component.registerForm.value.username =
            TEST_REGISTER_MODEL.username;
         spectator.component.registerForm.value.gender =
            TEST_REGISTER_MODEL.gender;
         spectator.component.registerForm.value.knownAs =
            TEST_REGISTER_MODEL.knownAs;
         spectator.component.registerForm.value.dateOfBirth =
            TEST_REGISTER_MODEL.dateOfBirth;
         spectator.component.registerForm.value.city = TEST_REGISTER_MODEL.city;
         spectator.component.registerForm.value.country =
            TEST_REGISTER_MODEL.country;
         spectator.component.registerForm.value.password =
            TEST_REGISTER_MODEL.password;
         spectator.component.registerForm.value.confirmPassword =
            TEST_REGISTER_MODEL.password;

         spectator.detectComponentChanges();
         pageObject.clickRegister();
         await pageObject.whenStable();
         spectator.detectComponentChanges();
         spectator.detectChanges();

         //  spectator.component.onRegister();
         //  expect(spectator.component.registerForm.valid).toBeTrue();
         expect(pageObject.output.register).toEqual(TEST_REGISTER_MODEL);
      })
   );

   it('should reset Form for onCancel', () => {});
});
