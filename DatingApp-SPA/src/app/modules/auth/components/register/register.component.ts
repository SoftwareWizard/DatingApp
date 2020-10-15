import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppRouteNames } from 'src/app/app-routing.names';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';

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

   constructor(
      private accountService: AccountService,
      private fb: FormBuilder,
      private router: Router
   ) {}

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
         const model = this.registerForm.value;
         await this.accountService.register(model);
         this.router.navigateByUrl(`/${AppRouteNames.MEMBERS}`);
      } catch (error) {
         this.validationErrors = error;
      }
   }

   cancel(): void {
      this.registerForm.reset();
      this.initializeForm();
   }
}
