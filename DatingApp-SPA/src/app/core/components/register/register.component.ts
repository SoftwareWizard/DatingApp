import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
   isUsernameValid: any;

   constructor(private accountService: AccountService) {}

   ngOnInit(): void {
      this.initializeForm();
   }

   initializeForm(): void {
      this.registerForm = new FormGroup({
         username: new FormControl('Hello', [Validators.required, Validators.minLength(4)]),
         password: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
         ]),
         confirmPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
            this.matchValues('password'),
         ]),
      });

      this.isUsernameValid = this.registerForm.get('username')?.errors && this.registerForm.get('username');
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
