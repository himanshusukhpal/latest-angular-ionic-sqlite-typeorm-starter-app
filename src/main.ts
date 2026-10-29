import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import sqliteParams from './databases/sqlite/params';
// import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader';
import { initializeAds } from './databases/datasources/ads.datasource';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(withXhr(), withInterceptors([])),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
})
  .then(() => {
    if (sqliteParams.platform === 'web') {
      if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().then((persistent) => {
          // // console.log('StorageManager: Persistent?', persistent);
        });
      } else if (document.requestStorageAccess) {
        document
          .requestStorageAccess()
          .then(() => {
            // console.log('StorageManager: Storage access granted (Safari)');
          })
          .catch(() => {
            // console.log('StorageManager: Storage access denied (Safari)');
          });
      } else {
        // console.log('StorageManager: Persistence unsupported');
      }

      // Load custom Ionic PWA elements
      // pwaElements(window);
    }
    // else {
    //   initializeAds('main'); // Uncomment if needed
    // }
    initializeAds('main'); // Uncomment if needed
  })
  .catch((err) => console.error(err));
