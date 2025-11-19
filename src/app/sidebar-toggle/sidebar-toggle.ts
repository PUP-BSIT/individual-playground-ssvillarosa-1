import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Site } from '../../service/site';

@Component({
  selector: 'app-sidebar-toggle',
  imports: [MatIconModule],
  templateUrl: './sidebar-toggle.html',
  styleUrl: './sidebar-toggle.scss',
})
export class SidebarToggle {
  isSidebarShown = signal(false);

  siteService = inject(Site);

  constructor() {
    this.siteService
      .getSidebarListener()
      .pipe(takeUntilDestroyed())
      .subscribe((isSidebarShown) => {
        this.isSidebarShown.set(isSidebarShown);
      });
  }

  toggleSidebar() {
    if(this.isSidebarShown()) {
      this.siteService.hideSidebar();
      return;
    }
    this.siteService.showSidebar();
  }
}
