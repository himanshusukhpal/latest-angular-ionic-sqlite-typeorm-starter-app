import { blockApp, getErrorMessage } from "src/app/utils/error.utils";
import { ads, setNeedToSaveToWebStoreTrue } from "src/databases/datasources/ads.datasource";

export function dbGetterClassesWrapper(applyClass: any) {
  Object.getOwnPropertyNames(applyClass.prototype).forEach(f => {
    if (f !== 'constructor' && typeof applyClass.prototype[f] === 'function') {
      const old = applyClass.prototype[f];
      applyClass.prototype[f] = function (...args: any) {
        if (!ads.isInitialized) throw Error('Rds not initialized')
        return old.apply(this, args);
      }
    }
  })
}

export function dbSetterClassesWrapper(applyClass: any) {
  Object.getOwnPropertyNames(applyClass.prototype).forEach(f => {
    if (f !== 'constructor' && typeof applyClass.prototype[f] === 'function') {
      const old = applyClass.prototype[f];
      applyClass.prototype[f] = function (...args: any) {
        if (!ads.isInitialized) throw Error('Rds is not initialized');
        else setNeedToSaveToWebStoreTrue();
        try {
          return old.apply(this, args);
        } catch (e: any) {
          const message = getErrorMessage(e);
          if (message.includes('Transaction is not started yet')) {
            blockApp(e);
          }
          throw e;
        }
      };
    }
  })
}



