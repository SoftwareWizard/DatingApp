import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { HomeComponent } from './home.component';

const REGISTER_BUTTON_TEXT = 'Register';

describe('HomeComponent', () => {
   let spectator: Spectator<HomeComponent>;
   const createComponent = createComponentFactory(HomeComponent);

   beforeEach(() => (spectator = createComponent()));

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it('should display Register Button when not logged in', () => {
      spectator.setInput({ loggedIn: false });
      spectator.detectChanges();
      const buttons = spectator.queryAll('button');
      const editButton = buttons.find(item => item.textContent === REGISTER_BUTTON_TEXT);
      expect(editButton).toBeTruthy();
   });

   it('should not display Register Button when logged in', () => {
      spectator.setInput({ loggedIn: true });
      spectator.detectChanges();
      const buttons = spectator.queryAll('button');
      const editButton = buttons.find(item => item.textContent === REGISTER_BUTTON_TEXT);
      expect(editButton).toBeFalsy();
   });
});
