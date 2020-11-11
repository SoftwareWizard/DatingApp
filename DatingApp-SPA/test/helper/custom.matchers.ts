import { LoadChildrenCallback, Route } from '@angular/router';
import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

export const CustomMatchers: CustomMatcherFactories = {
   toHaveLazyLoadedModule(
      util: MatchersUtil,
      customEqualityTester: CustomEqualityTester[]
   ): CustomMatcher {
      return {
         compare(route: Route, moduleName: string): CustomMatcherResult {
            const loadChildren = route?.loadChildren?.toString();
            const index = loadChildren?.indexOf(moduleName);

            if (index > 0) {
               try {
                  const callback = route?.loadChildren as LoadChildrenCallback;
                  callback();
               } catch (error) {}

               return {
                  pass: true,
                  message: `Route has lazy loaded module ${moduleName}`,
               };
            } else {
               return {
                  pass: false,
                  message: `Route does not have lazy loaded module ${moduleName}`,
               };
            }
         },
      };
   },

   toHaveCanActivateGuard(
      util: MatchersUtil,
      customEqualityTester: CustomEqualityTester[]
   ): CustomMatcher {
      return {
         compare(route: Route, guardName: string): CustomMatcherResult {
            const guards = route?.canActivate;
            const index = guards?.find(item => item.name === guardName);

            if (index) {
               return {
                  pass: true,
                  message: `Route has guard ${guardName}`,
               };
            } else {
               return {
                  pass: false,
                  message: `Route does not have guard ${guardName}`,
               };
            }
         },
      };
   },
};
