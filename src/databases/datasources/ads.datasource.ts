import { DataSource } from 'typeorm';
import sqliteParams from '../sqlite/params';

import localForage from 'localforage';
import initSqlJs from 'sql.js';

import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

import * as entities from '../entities/index';
import * as migrations from '../migrations/index';

// import { CapacitorConnectionOptions } from 'typeorm/driver/capacitor/CapacitorConnectionOptions';
// import { SqljsConnectionOptions } from 'typeorm/driver/sqljs/SqljsConnectionOptions';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

const webDataSourceConfig: any = {
  name: 'appDbConnection',
  type: 'sqljs',
  location: sqliteParams.dbName,
  useLocalForage: true,
  autoSave: true,
  autoSaveCallback: (uint8Data: any) => saveToWebStoreSubject.next(uint8Data),
  entities,
  migrations,
  subscribers: [],
  // logging: 'all',
  logging: [/*'query',*/ 'error', 'schema'],
  synchronize: false, // !!! You will lose all data in database if set to `true`
  migrationsRun: false, // Required with capacitor type
};

const dataSourceConfig: any = {
  name: 'appDbConnection',
  type: 'capacitor',
  driver: sqliteParams.connection,
  database: sqliteParams.dbName,
  mode: sqliteParams.mode,
  entities,
  migrations,
  subscribers: [],
  // logging: 'all',
  logging: [/*'query',*/ 'error', 'schema'],
  synchronize: false, // !!! You will lose all data in database if set to `true`
  migrationsRun: false, // Required with capacitor type
};

let initAttemtCounter = 0;
let initializing = false;
let needToSaveToWebStore = false;
let saveToWebStoreSubject: Subject<any>;

export let migrationsResult: any;
export const initAdsErrors: any[] = [];

let nativeDbConn: SQLiteDBConnection;

export let ads = new DataSource(dataSourceConfig);

async function initSqlite() {
  const res = await initSqlJs({
    locateFile: (file: string) => 'assets/sql-wasm.wasm',
  });
  (window as any).SQL = res;
}
async function initLocalForage() {
  try {
    (window as any).localforage = localForage;
    localForage.config({
      name: 'appBucket',
      version: 1,
      storeName: 'databases',
      description: 'application database bucket',
      driver: localForage.INDEXEDDB,
    });
  } catch (error) {
    console.error('Error initializing localForage:', error);
    throw error;
  }
}
export function setNeedToSaveToWebStoreTrue() {
  needToSaveToWebStore = true;
}
function setNeedToSaveToWebStoreFalse() {
  needToSaveToWebStore = false;
}
function saveToWebStore(uint8Data: Uint8Array) {
  try {
    if (needToSaveToWebStore) {
      localForage.setItem(
        'appDbName',
        '[' + uint8Data.toString() + ']',
        setNeedToSaveToWebStoreFalse
      );
    }
  } catch (e) {
    window.alert(
      'Storage failure!'
    );
  }
}

async function checkInitializing(tracer: number) {
  try {
    await new Promise((res) => setTimeout(res, 500));
    if (initializing) {
      await checkInitializing(tracer);
    }
  } finally {
    return tracer;
  }
}

export async function initializeAds(requestOrigin: string) {
  const initCount = initAttemtCounter++;
  // console.log('initializeAds, requested by:' + requestOrigin);

  if (initializing) await checkInitializing(initCount);

  if (!ads?.isInitialized) {
    try {
      initializing = true;

      // console.log('ads initialize, requested By: ' + requestOrigin);
      if (sqliteParams.platform === 'web') {
        await initLocalForage();
        await initSqlite();

        saveToWebStoreSubject = new Subject();
        saveToWebStoreSubject
          .pipe(debounceTime(700), distinctUntilChanged())
          .subscribe(saveToWebStore);

        ads = new DataSource(webDataSourceConfig);

        await ads.initialize();
      } else {
        await sqliteParams.connection.checkConnectionsConsistency();
        await ads.initialize();
      }
      migrationsResult = await ads.runMigrations();
    } catch (e) {
      // console.log(e);
      initAdsErrors.push(e);
      throw e;
    } finally {
      initializing = false;
    }
  }
}

export async function closeAdsForWeb(_event?: any) {
  if (ads.isInitialized && sqliteParams.platform === 'web') {
    // console.log('Close Ads for web');
    try {
      await ads.destroy(); // TypeORM method to close the connection
      // console.log('Database connection closed successfully.');
    } catch (e: any) {
      console.error('Error closing database connection gracefully:', e.message);
    }
  }
}

export async function closeAdsForNative() {
  if (ads.isInitialized) {
    // console.log('Close Ads for native');
    try {
      const { dbName, readonly } = sqliteParams;

      if (
        (await sqliteParams.connection.isConnection(dbName, readonly)).result
      ) {
        const nativeDbConn = await sqliteParams.connection.retrieveConnection(
          dbName,
          readonly
        );
        const isTransactionActive = await nativeDbConn.isTransactionActive();
        if (isTransactionActive.result) {
          // console.log('Transaction is active, committing...');
          await ads.query('COMMIT');
        }
      }
    } catch (e: any) {
      console.error('Error closing database connection gracefully:', e.message);
    } finally {
      await ads.destroy(); // TypeORM method to close the connection
      // console.log('Database connection closed successfully.');
    }
  }
}

export async function exportAdsToJSON() {
  return {
    'authors': await ads.getRepository(entities.Author).find({ loadEagerRelations: false }),
    'posts': await ads.getRepository(entities.Post).find({ loadEagerRelations: false })
  }
}

export async function logAdsCounts() {
  console.log('Ads counts ===============>', {
    'authors': await ads.getRepository(entities.Author).count(),
    'posts': await ads.getRepository(entities.Post).count()
  })
}
