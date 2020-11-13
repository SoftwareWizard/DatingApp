declare namespace jasmine {
  interface Matchers<T> {
     toHaveLazyLoadedModule(moduleName: string): boolean;
     toHaveCanActivateGuard(guardName: string): boolean;
  }
}
