import { IFacadeSpy } from './facade-spy.type';
import { Spectator, SpectatorService } from '@ngneat/spectator';
import { of } from 'rxjs';

export const getFacadeSpy = (
   spectator: Spectator<any>,
   TFacade: any,
   TSelectors
): IFacadeSpy<typeof TFacade> => {
   const spy = spectator.inject(TFacade) as IFacadeSpy<typeof TFacade>;
   return populateSpy(spy, TFacade, TSelectors);
};

export const getFacadeSpyFromService = (
   spectator: SpectatorService<any>,
   TFacade: any,
   TSelectors
): IFacadeSpy<typeof TFacade> => {
   const spy = spectator.inject(TFacade) as IFacadeSpy<typeof TFacade>;
   return populateSpy(spy, TFacade, TSelectors);
};

function populateSpy(
   spy: any,
   TFacade: any,
   TSelectors
): IFacadeSpy<typeof TFacade> {
   const x = new TFacade();
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
}
