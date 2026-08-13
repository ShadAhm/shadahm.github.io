import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// @analogjs/vitest-angular's setupTestBed() helper (setup-testbed.js) imports the
// ɵgetCleanupHook symbol from @angular/core/testing, which is only exported starting
// with Angular 20. This project is pinned to Angular 18, so TestBed is initialized
// manually here instead, using the same public API the previous Karma test.ts used.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: true } }
);
