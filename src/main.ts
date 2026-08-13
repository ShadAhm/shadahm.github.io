import './polyfills';
import './styles.scss';
import { enableProdMode } from '@angular/core';
// Ensure the JIT compiler is present as a runtime fallback for partially-compiled libraries
// (fixes: "The injectable 'PlatformNavigation' needs to be compiled using the JIT compiler")
import '@angular/compiler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
