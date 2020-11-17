import {
   Directive,
   Input,
   TemplateRef,
   ViewContainerRef,
   OnInit,
} from '@angular/core';

@Directive({
   selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
   @Input() appHasRole: string[];

   constructor(
      public viewContainerRef: ViewContainerRef,
      public templateRef: TemplateRef<any>
   ) {}

   ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
   }

   show(): void {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
   }

   hide(): void {
      this.viewContainerRef.clear();
   }
}
