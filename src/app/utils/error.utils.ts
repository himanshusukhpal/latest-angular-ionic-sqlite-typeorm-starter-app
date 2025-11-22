import { EventEmitter } from "@angular/core";

export function getErrorMessage(error: any) {
  let message = 'Exception';
  if(typeof error === 'object' || typeof error === 'symbol') {
    if(error['message']) message = error.message;
    if(error['error']) {
      if(
        (
          typeof error.error === 'object' ||
          typeof error.error === 'symbol'
        ) &&
        error.error['message']
      ) message = error.error.message;
    }
  }
  else message = error;
  return message;
}

export const blockAppEmitter: EventEmitter<(any)> = new EventEmitter<any>();
export function blockApp(error: any) {
  blockAppEmitter.emit(error);
}
