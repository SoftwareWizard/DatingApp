import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
   AbstractControl,
   FormBuilder,
   FormControl,
   FormGroup,
   ValidatorFn,
   Validators,
} from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { AccountService } from '../../services/account.service';

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
   @Input() user: User;
   @Output() cancelRegister = new EventEmitter();

   model: any = {};
   registerForm: FormGroup;

   constructor(private accountService: AccountService, private fb: FormBuilder) {}

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

   async register(): Promise<void> {
      try {
         await this.accountService.register(this.model);
         this.cancelRegister.emit();
      } catch (error) {
         console.log(error);
      }
   }

   cancel(): void {
      console.log('cancelled');
      this.cancelRegister.emit();
   }
}
