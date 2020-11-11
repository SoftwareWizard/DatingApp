import { Spectator } from '@ngneat/spectator';
import { ngMocks } from 'ng-mocks';

export const findRouteTargetComponent = (
   spectator: Spectator<any>,
   TComponent
): typeof TComponent => {
   try {
      const mock = ngMocks.find<typeof TComponent>(
         spectator.fixture,
         TComponent
      );
      const componentInstance = mock.componentInstance as typeof TComponent;
      const nativeElement = mock.nativeElement;
      nativeElement.innerText = TComponent.name;
      return componentInstance;
   } catch (error) {
      console.error(error.message);
      return null;
   }
};
