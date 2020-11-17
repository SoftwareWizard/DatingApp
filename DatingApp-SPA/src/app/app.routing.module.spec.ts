import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AppRouteNames } from './app-routing.names';
import { AuthFacade } from './modules/auth/store/auth.facade';
import { LikeService } from './modules/members/services/like.service';
import {
   ComponentFixture,
   fakeAsync,
   TestBed,
   tick,
   waitForAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';
import { AppModule } from './app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.routing.module';
import { Location } from '@angular/common';
import { asyncData } from 'test/helper/async-observable-helper';
import { NgZone, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TEST_MEMBERS } from 'test/test-data/test-members';
import { FacadeSpy } from 'test/mocks/spy.facade';
import * as authSelectors from './modules/auth/store/auth.selectors';
import { LikesContainerComponent } from './core/container';
import { AppContainerComponent } from './core/container/app/app.container';
import { TestErrorsComponent } from './modules/errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './modules/errors/server-error/server-error.component';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';
import { HomeContainerComponent } from './core/container/home/home.container';
import { CustomMatchers } from 'test/helper/jasmine-matchers';

let comp: AppContainerComponent;
let fixture: ComponentFixture<AppContainerComponent>;
let router: Router;
let location: SpyLocation;
let ngZone: NgZone;

const authFacadeSpy = new FacadeSpy(AuthFacade, authSelectors);
const likeServiceSpy = jasmine.createSpyObj('LikeService', ['getLikes']);
const authGuardSpy = jasmine.createSpyObj('AuthGuard', ['canActivate']);

describe('app.routing', () => {
   beforeAll(() => jasmine.addMatchers(CustomMatchers));

   beforeEach(
      waitForAsync(() => {
         TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule.withRoutes(routes)],
            providers: [
               { provide: LikeService, useValue: likeServiceSpy },
               { provide: AuthFacade, useValue: authFacadeSpy },
               { provide: AuthGuard, useValue: authGuardSpy },
            ],
            declarations: [],
         }).compileComponents();

         createComponent();
      })
   );

   it('should navigate to default', fakeAsync(() => {
      ngZone.run(() => router.initialNavigation());
      advance();
      expectPathToBe(AppRouteNames.ROOT);
      expectElementOf(HomeContainerComponent);
   }));

   it('should navigate to fallback', fakeAsync(() => {
      ngZone.run(() => router.navigateByUrl('illegal'));
      advance();
      expectPathToBe('illegal');
      expectElementOf(HomeContainerComponent);
   }));

   it('should navigate to LikesContainerComponent', fakeAsync(() => {
      const route = routes.find(item => item.path === AppRouteNames.LIKES);

      likeServiceSpy.getLikes.and.returnValue(asyncData(TEST_MEMBERS));
      authGuardSpy.canActivate.and.returnValue(asyncData(true));

      ngZone.run(() => router.navigateByUrl(AppRouteNames.LIKES));
      advance();
      expectPathToBe(AppRouteNames.LIKES);
      expectElementOf(LikesContainerComponent);

      expect(route).toBeTruthy();
      expect(route).toHaveCanActivateGuard('AuthGuard');
   }));

   it('should navigate to NotFoundComponent', fakeAsync(() => {
      ngZone.run(() => router.navigateByUrl(AppRouteNames.NOT_FOUND));
      advance();
      expectPathToBe(AppRouteNames.NOT_FOUND);
      expectElementOf(NotFoundComponent);
   }));

   it('should navigate to server-error', fakeAsync(() => {
      ngZone.run(() => router.navigateByUrl(AppRouteNames.SERVER_ERROR));
      advance();
      expectPathToBe(AppRouteNames.SERVER_ERROR);
      expectElementOf(ServerErrorComponent);
   }));

   it('should navigate to test-error', fakeAsync(() => {
      ngZone.run(() => router.navigateByUrl(AppRouteNames.TEST_ERRORS));
      advance();
      expectPathToBe(AppRouteNames.TEST_ERRORS);
      expectElementOf(TestErrorsComponent);
   }));

   it('can navigate to messages module', () => {
      const route = routes.find(item => item.path === AppRouteNames.MESSAGES);
      expect(route).toBeTruthy();
      expect(route).toHaveCanActivateGuard('AuthGuard');
      expect(route).toHaveLazyLoadedModule('MessageModule');
   });

   it('can navigate to members module', () => {
      const route = routes.find(item => item.path === AppRouteNames.MEMBERS);
      expect(route).toBeTruthy();
      expect(route).toHaveCanActivateGuard('AuthGuard');
      expect(route).toHaveLazyLoadedModule('MembersModule');
   });

   it('can navigate to auth module', () => {
      const route = routes.find(item => item.path === AppRouteNames.AUTH);
      expect(route).toBeTruthy();
      expect(route).not.toHaveCanActivateGuard('AuthGuard');
      expect(route).toHaveLazyLoadedModule('AuthModule');
   });

   it('can navigate to admin module', () => {
      const route = routes.find(item => item.path === AppRouteNames.ADMIN);
      expect(route).toBeTruthy();
      expect(route).not.toHaveCanActivateGuard('AuthGuard');
      expect(route).toHaveCanActivateGuard('AdminGuard');
      expect(route).toHaveLazyLoadedModule('AdminModule');
   });
});

function advance(): void {
   tick(); // wait while navigating
   fixture.detectChanges(); // update view
   tick(); // wait for async data to arrive
}

function createComponent(): void {
   fixture = TestBed.createComponent(AppContainerComponent);
   comp = fixture.componentInstance;
   ngZone = fixture.ngZone;

   const injector = fixture.debugElement.injector;
   location = injector.get(Location) as SpyLocation;
   router = injector.get(Router);
}

function expectPathToBe(path: string, expectationFailOutput?: any): void {
   expect(location.path()).toEqual(
      `/${path}`,
      expectationFailOutput || 'location.path()'
   );
}

function expectElementOf(type: Type<any>): any {
   const debugElement = fixture.debugElement.query(By.directive(type));
   expect(debugElement).toBeTruthy('expected an element for ' + type.name);
   return debugElement;
}
