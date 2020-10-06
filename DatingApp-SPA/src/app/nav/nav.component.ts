import { async } from '@angular/core/testing';
import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
   model: any = { username: 'john', password: 'password'};
   loggedIn: boolean;

   constructor(private accountService: AccountService) {}

   ngOnInit(): void {
   }

   async login(): Promise<void> {
    let token$ = this.accountService.login(this.model);
    let token = await token$.toPromise();
    this.loggedIn = true;
    console.log(token);
   }

   async logout(): Promise<void> {
     this.loggedIn = false;
   }
}
