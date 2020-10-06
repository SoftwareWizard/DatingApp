import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
   model: any = { username: '', password: ''};

   constructor(private accountService: AccountService) {}

   ngOnInit(): void {
   }

   async login(): void {
    let token$ = this.accountService.login(this.model);
    let token = await token$.toPromise();
    console.log(token);
   }
}
