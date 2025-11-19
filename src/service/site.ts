import { BehaviorSubject } from 'rxjs';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Site {
  private isSiteLoadingShownListener = new BehaviorSubject<boolean>(false);
  private isSidebarShownListener = new BehaviorSubject<boolean>(false);
  private snackBar = inject(MatSnackBar);

  showLoading() {
    this.isSiteLoadingShownListener.next(true);
  }

  hideLoading() {
    this.isSiteLoadingShownListener.next(false);
  }

  getLoadingListener() {
    return this.isSiteLoadingShownListener.asObservable();
  }

  showSidebar() {
    this.isSidebarShownListener.next(true);
  }

  hideSidebar() {
    this.isSidebarShownListener.next(false);
  }

  getSidebarListener() {
    return this.isSidebarShownListener;
  }

  showSnackBar(message: string, action: string = 'Close') {
    if (!message) return;

    this.snackBar.open(message, action);
  }  
}
