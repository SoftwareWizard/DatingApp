import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

   constructor(private accountService: AccountService) {}

   ngOnInit(): void {}

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
