import { TextInputComponent } from './../text-input/text-input.component';
import { MockComponent } from 'ng-mocks';
import { SharedModule } from './../../../shared/shared.module';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
   let spectator: Spectator<RegisterComponent>;
   const createComponent = createComponentFactory({
      component: RegisterComponent,
      declarations: [MockComponent(TextInputComponent)],
      imports: [SharedModule],
   });

   beforeEach(() => (spectator = createComponent()));

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });
});
