import { IFacadeSpy } from './facade-spy.type';
import { Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

export const getFacadeSpy = (
   spectator: Spectator<any>,
   TFacade: any,
   TSelectors
): IFacadeSpy<typeof TFacade> => {
   const x = new TFacade();
   const spy = spectator.inject(TFacade) as IFacadeSpy<typeof TFacade>;

   const names = Object.keys(x).reverse();
   names.pop();

   names.forEach(
      name => (spy[name] = jasmine.createSpyObj(name, ['dispatch']))
   );

   const selectorNames = Object.keys(TSelectors);
   // tslint:disable-next-line: no-string-literal
   spy['select'] = jasmine.createSpyObj('select', selectorNames);
   selectorNames.forEach(selectorName => {
      // tslint:disable-next-line: no-string-literal
      spy['select'][selectorName] = of();
   });
   return spy;
};
