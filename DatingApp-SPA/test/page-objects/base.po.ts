import { By } from '@angular/platform-browser';
import { Spectator } from '@ngneat/spectator';
import { ngMocks, Type } from 'ng-mocks';

export class PageObjectBase<TComponent> {
   constructor(protected spectator: Spectator<TComponent>) {}

   input = {
      set: (input: Partial<TComponent>) => this.spectator.setInput(input),
   };

   detectChanges(): void {
      this.spectator.detectChanges();
   }

   async whenStable(): Promise<void> {
      await this.spectator.fixture.whenStable();
   }

   getElement<TElement>(cssSelector: string): TElement {
      return (this.spectator.query(cssSelector) as unknown) as TElement;
   }

   getMockDirective<TDirective>(
      cssSelector: string,
      TDirective: Type<TDirective>
   ): TDirective {
      const debugElement = this.spectator.debugElement.query(
         By.css(cssSelector)
      );

      return ngMocks.get(debugElement, TDirective);
   }
}
