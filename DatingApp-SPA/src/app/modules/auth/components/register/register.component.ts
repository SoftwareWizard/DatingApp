import { RegisterModel } from './../../models/register.model';
import {
   ChangeDetectionStrategy,
   Component,
   EventEmitter,
   OnInit,
   Output,
} from '@angular/core';
import {
   AbstractControl,
   FormBuilder,
   FormGroup,
   ValidatorFn,
   Validators,
} from '@angular/forms';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
   @Output() register = new EventEmitter<RegisterModel>();

   registerForm: FormGroup;
   validationErrors: string[];

   constructor(private fb: FormBuilder) {}

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
         password: [
            '',
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(8),
            ],
         ],
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

   onRegister(): void {
      const registerModel = this.registerForm.value as RegisterModel;
      this.register.emit(registerModel);
   }

   onCancel(): void {
      this.registerForm.reset();
      this.initializeForm();
   }
}
