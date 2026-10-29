import { Injectable } from '@angular/core';

import { dbGetterClassesWrapper } from './db-process.utils';

import { exportAdsToJSON } from '../../../databases/datasources/ads.datasource';

@Injectable({
  providedIn: 'any'
})
export class DbGetService {

  constructor( ) { }

  // downloadAdsDb() {
  //   exportAdsToDbFile();
  // }

  exportToJson() {
    return exportAdsToJSON();
  }

}

dbGetterClassesWrapper(DbGetService);
