import { Component, inject, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CountrySearch } from './country-search/country-search';
import { SidebarToggle } from './sidebar-toggle/sidebar-toggle';
import { Site } from '../service/site';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [MatProgressBarModule, MatIconModule, MatSidenavModule, CountrySearch, SidebarToggle],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isLoading = signal(false);
  isSidebarShown = signal(false);

  siteService = inject(Site);

  constructor() {
    // setup site loading handling
    this.siteService
      .getLoadingListener()
      .pipe(takeUntilDestroyed())
      .subscribe((isLoading) => {
        this.isLoading.set(isLoading);
      });

    // setup sidebar handling
    this.siteService
      .getSidebarListener()
      .pipe(takeUntilDestroyed())
      .subscribe((isSidebarShown) => {
        this.isSidebarShown.set(isSidebarShown);
      });
  }
}
