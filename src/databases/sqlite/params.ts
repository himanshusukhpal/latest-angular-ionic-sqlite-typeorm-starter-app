import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, CapacitorSQLitePlugin, SQLiteConnection } from '@capacitor-community/sqlite';

const sqliteConnection: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
const sqlitePlugin = CapacitorSQLite;
const platform: string = Capacitor.getPlatform();

interface sqliteParamsInterface {
  connection: SQLiteConnection,
  dbName: string,
  mode: "no-encryption" | "encryption" | "secret" | "newsecret" | undefined,
  encrypted: boolean,
  readonly: boolean,
  journalMode: 'WAL' | 'DELETE' | 'TRUNCATE' | 'PERSIST' | 'MEMORY' | 'OFF' | undefined,
  plugin: CapacitorSQLitePlugin,
  platform: string
}

const sqliteParams: sqliteParamsInterface = {
  connection: sqliteConnection,
  dbName: 'appDbName',
  mode: 'no-encryption',
  encrypted: false,
  readonly: false,
  journalMode: 'WAL',
  plugin: sqlitePlugin,
  platform
}

export default sqliteParams;
