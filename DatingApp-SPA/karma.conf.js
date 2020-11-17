// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
   config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
         require('karma-jasmine'),
         require('karma-chrome-launcher'),
         require('karma-jasmine-html-reporter'),
         require('karma-coverage'),
         require('@angular-devkit/build-angular/plugins/karma'),
      ],
      client: {
         clearContext: false, // leave Jasmine Spec Runner output visible in browser
      },
      reporters: ['progress', 'coverage'],
      preprocessors: {
         // source files, that you wanna generate coverage for
         // do not include tests or libraries
         // (these files will be instrumented by Istanbul)
         'src/**/*.ts': ['coverage'],
      },
      coverageReporter: {
         dir: 'coverage/',
         reporters: [
            // { type: 'html', subdir: '.' },
            { type: 'lcov', subdir: '.' },
         ],
      },
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['ChromeDebug'],
      singleRun: true,
      customLaunchers: {
         ChromeDebug: {
            base: 'Chrome',
            flags: ['--no-sandbox', '--remote-debugging-port=9222'],
         },
      },
   });
};
