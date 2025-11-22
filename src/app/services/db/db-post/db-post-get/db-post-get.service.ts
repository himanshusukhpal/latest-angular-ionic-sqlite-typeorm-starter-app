import { Injectable } from '@angular/core';

import { dbGetterClassesWrapper } from '../../db-process.utils';

import { AlertService } from '../../../../services/alert/alert.service';

@Injectable({
  providedIn: 'any'
})
export class DbPostGetService {

  constructor(
    private alert: AlertService
  ) {}

}

dbGetterClassesWrapper(DbPostGetService);
