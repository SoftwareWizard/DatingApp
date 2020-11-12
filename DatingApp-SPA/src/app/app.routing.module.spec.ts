
// tslint:disable-next-line: no-reference
// / <reference path='../../test/helper/custom.matchers.d.ts' />

import { MockComponent } from 'ng-mocks';
import { waitForAsync } from '@angular/core/testing';
import {
   createRoutingFactory,
   SpectatorRouting,
   SpyObject,
} from '@ngneat/spectator';
import { routes } from './app.routing.module';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

import { findRouteTargetComponent } from 'test/helper/find-route-target';
import { of } from 'rxjs';
import { CustomMatchers } from 'test/helper/custom.matchers';
import {
   LikesContainerComponent,
   NavContainerComponent,
   HomeContainerComponent,
   AppContainerComponent,
} from './core/container';
import { AppRouteNames } from 'src/app/app-routing.names';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AuthFacade } from 'src/app/modules/auth';
import { LikeService } from 'src/app/modules/members';
import { AdminPanelComponent } from './modules/admin/components/admin-panel/admin-panel.component';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';
import { HomeComponent } from './core/components/home/home.component';
import { MessageListComponent } from './modules/message';
import { AsyncPipe } from './../../test/mocks/async-mock.pipe';

describe('app.routing navigate to', () => {
   let spectator: SpectatorRouting<AppContainerComponent>;
   let location: SpyObject<Location>;
   let router: SpyObject<Router>;

   const createComponent = createRoutingFactory({
      component: AppContainerComponent,
      // imports: [CommonModule, BrowserModule],
      mocks: [AuthFacade, AuthGuard, LikeService],
      declarations: [
         MockComponent(NavContainerComponent),
         MockComponent(NgxSpinnerComponent),
         MockComponent(HomeContainerComponent),
         MockComponent(NotFoundComponent),
         MockComponent(AdminPanelComponent),
         MockComponent(MessageListComponent),
         MockComponent(LikesContainerComponent),
         MockComponent(HomeComponent),
         AsyncPipe,
      ],
      routes,
      stubsEnabled: false,
   });

   beforeEach(() => {
      spectator = createComponent();
      location = spectator.inject(Location);
      router = spectator.inject(Router);
      jasmine.addMatchers(CustomMatchers);
   });

   it(
      'not-found works',
      waitForAsync(async () => {
         debugger;
         await spectator.fixture.whenStable();
         const route = routes.find(
            item => item.path === AppRouteNames.NOT_FOUND
         );

         await spectator.fixture.ngZone.run(async () =>
            router.navigateByUrl(AppRouteNames.NOT_FOUND)
         );

         spectator.detectComponentChanges();
         await spectator.fixture.whenStable();
         const targetComponent = findRouteTargetComponent(
            spectator,
            NotFoundComponent
         );

         //  expect(route).not.toHaveCanActivateGuard('AuthGuard');
         expect(targetComponent).toBeTruthy();
      })
   );

   it(
      'home works',
      waitForAsync(async () => {
         debugger;
         const route = routes.find(item => item.path === AppRouteNames.ROOT);
         await spectator.fixture.whenStable();

         await spectator.fixture.ngZone.run(async () =>
            router.navigateByUrl(AppRouteNames.LIKES)
         );

         await spectator.fixture.whenStable();
         const targetComponent = findRouteTargetComponent(
            spectator,
            HomeContainerComponent
         );

         expect(route).not.toHaveCanActivateGuard('AuthGuard');
         expect(targetComponent).toBeTruthy();
      })
   );

   it(
      'likes works',
      waitForAsync(async () => {
         const route = routes.find(item => item.path === AppRouteNames.LIKES);
         const authGuardSpy = spectator.inject(AuthGuard);
         authGuardSpy.canActivate.and.returnValue(of(true));

         await spectator.fixture.whenStable();
         await spectator.fixture.ngZone.run(async () =>
            router.navigateByUrl(AppRouteNames.LIKES)
         );

         await spectator.fixture.whenStable();
         const targetComponent = findRouteTargetComponent(
            spectator,
            LikesContainerComponent
         );

         expect(route).toBeTruthy();
         expect(route).toHaveCanActivateGuard('AuthGuard');
         expect(targetComponent).toBeTruthy();
      })
   );

   it('messages module works', () => {
      const route = routes.find(item => item.path === AppRouteNames.MESSAGES);
      expect(route).toBeTruthy();
      expect(route).toHaveCanActivateGuard('AuthGuard');
      expect(route).toHaveLazyLoadedModule('MessageModule');
   });

   it('members module works', () => {
      const route = routes.find(item => item.path === AppRouteNames.MEMBERS);
      expect(route).toBeTruthy();
      expect(route).toHaveCanActivateGuard('AuthGuard');
      expect(route).toHaveLazyLoadedModule('MembersModule');
   });

   it('auth module works', () => {
      const route = routes.find(item => item.path === AppRouteNames.AUTH);
      expect(route).toBeTruthy();
      expect(route).not.toHaveCanActivateGuard('AuthGuard');
      expect(route).toHaveLazyLoadedModule('AuthModule');
   });

   it('admin module works', () => {
      const route = routes.find(item => item.path === AppRouteNames.ADMIN);
      expect(route).toBeTruthy();
      expect(route).not.toHaveCanActivateGuard('AuthGuard');
      expect(route).toHaveCanActivateGuard('AdminGuard');
      expect(route).toHaveLazyLoadedModule('AdminModule');
   });

   it(
      'unknown redirects to root',
      waitForAsync(async () => {
         await spectator.fixture.whenStable();
         await spectator.fixture.ngZone.run(async () =>
            router.navigateByUrl('illegal')
         );

         await spectator.fixture.whenStable();
         const targetComponent = findRouteTargetComponent(
            spectator,
            HomeContainerComponent
         );
         expect(targetComponent).toBeTruthy();
      })
   );
});
