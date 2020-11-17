import { of } from 'rxjs';

export class FacadeSpy {
   public select: any;

   constructor(TFacade: any, TSelectors: any) {
      const x = new TFacade();
      // const spy = jasmine.createSpyObj(x.name, ['']);

      const names = Object.keys(x).reverse();
      names.pop();

      names.forEach(
         name => (this[name] = jasmine.createSpyObj(name, ['dispatch']))
      );

      const selectorNames = Object.keys(TSelectors);

      // tslint:disable-next-line: no-string-literal
      this['select'] = jasmine.createSpyObj('select', selectorNames);
      selectorNames.forEach(selectorName => {
         // tslint:disable-next-line: no-string-literal
         this['select'][selectorName] = of();
      });
   }
   //  constructor() {
   //     this.select = jasmine.createSpyObj('select', ['isLoggedIn']);
   //     this.select.isLoggedIn = of(true); //. and.returnValue(of(true));
   //  }
   //  select = {
   //     isLoggedIn : of(false),
   //  };
}
