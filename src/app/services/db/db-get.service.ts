import { Injectable } from '@angular/core';

import { dbGetterClassesWrapper } from './db-process.utils';

import { exportRdsToJSON } from '../../../databases/datasources/ads.datasource';

@Injectable({
  providedIn: 'any'
})
export class DbGetService {

  constructor( ) { }

  // downloadRdsDb() {
  //   exportRdsToDbFile();
  // }

  exportToJson() {
    return exportRdsToJSON();
  }

}

dbGetterClassesWrapper(DbGetService);
