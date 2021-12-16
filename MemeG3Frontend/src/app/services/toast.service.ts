import { Injectable } from '@angular/core';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer
} from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() { }

  toastNotification(title: string,
                    message: string,
                    toastLayout: DialogLayoutDisplay): void {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(title);
    newToastNotification.setMessage(message);
    newToastNotification.setConfig({
      LayoutType: toastLayout
      // WARNING | SUCCESS | INFO | NONE | DANGER | WARNING
    });

    newToastNotification.openToastNotification$();
  }
}
