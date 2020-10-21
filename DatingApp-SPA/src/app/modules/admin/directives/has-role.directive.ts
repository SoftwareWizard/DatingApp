import { AuthFacade } from './../../auth/ngrx/auth.facade';
import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { take } from 'rxjs/operators';

@Directive({
   selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
   @Input() appHasRole: string[];

   constructor(
      private viewContainerRef: ViewContainerRef,
      private templateRef: TemplateRef<any>,
      private authFacade: AuthFacade
   ) {}

   async ngOnInit(): Promise<void> {
      const user = await this.authFacade.select.user.pipe(take(1)).toPromise();

      if (user == null || !user.roles) {
         this.viewContainerRef.clear();
         return;
      }

      if (user?.roles.some(item => this.appHasRole.includes(item))) {
         this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
         this.viewContainerRef.clear();
      }
   }
}