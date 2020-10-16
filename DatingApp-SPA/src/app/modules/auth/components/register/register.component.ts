import { AuthFacade } from './../../ngrx/auth.facade';
import { RegisterModel } from './../../models/register.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
   @Input() user: User;
   @Output() cancelRegister = new EventEmitter();

   registerForm: FormGroup;
   validationErrors: string[];

   constructor(private fb: FormBuilder, private authFacade: AuthFacade) {}

   ngOnInit(): void {
      this.initializeForm();
   }

   initializeForm(): void {
      this.registerForm = this.fb.group({
         gender: ['male'],
         username: ['Hello', [Validators.required, Validators.minLength(4)]],
         knownAs: ['', Validators.required],
         dateOfBirth: ['', Validators.required],
         city: ['', Validators.required],
         country: ['', Validators.required],
         password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
         confirmPassword: [
            '',
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(8),
               this.matchValues('password'),
            ],
         ],
      });
   }

   matchValues(matchTo: string): ValidatorFn {
      return (control: AbstractControl) => {
         return control?.value === control?.parent?.controls[matchTo].value
            ? null
            : { isMatching: true };
      };
   }

   register(): void {
      const registerModel = this.registerForm.value as RegisterModel;
      this.authFacade.register.dispatch(registerModel);
   }

   cancel(): void {
      this.registerForm.reset();
      this.initializeForm();
   }
}
