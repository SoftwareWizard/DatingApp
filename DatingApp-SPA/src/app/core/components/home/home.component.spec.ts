import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockDirective, ngMocks } from 'ng-mocks';
import { AuthRouteEnum } from 'src/app/modules/auth';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
   let spectator: Spectator<HomeComponent>;
   const createComponent = createComponentFactory({
      component: HomeComponent,
      declarations: [MockDirective(RouterLink)],
   });

   beforeEach(() => (spectator = createComponent()));

   it('should be created', () => {
      expect(spectator.component).toBeTruthy();
   });

   it('should display Register Button when not logged in', () => {
      spectator.setInput({ loggedIn: false });
      spectator.detectChanges();

      const editButton = spectator.debugElement.query(By.css('.register'));
      expect(editButton).toBeTruthy();
      const routerLinkMock = ngMocks.get(editButton, RouterLink);
      expect(routerLinkMock.routerLink).toBe(`/auth/${AuthRouteEnum.REGISTER}`);
   });

   it('should not display Register Button when logged in', () => {
      spectator.setInput({ loggedIn: true });
      spectator.detectChanges();

      const editButton = spectator.debugElement.query(By.css('.register'));
      expect(editButton).toBeFalsy();
   });
});
