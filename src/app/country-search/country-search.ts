import { catchError, debounceTime, EMPTY, filter, retry, switchMap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Country } from '../../service/country';
import { Site } from '../../service/site';

@Component({
  selector: 'app-country-search',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './country-search.html',
  styleUrl: './country-search.scss',
})
export class CountrySearch {
  searchForm: FormGroup;

  formBuilder = inject(FormBuilder);
  countryService = inject(Country);
  siteService = inject(Site);

  constructor() {
    this.searchForm = this.formBuilder.group({
      keyword: [''],
    });
    this.searchForm
      .get('keyword')!
      .valueChanges.pipe(
        takeUntilDestroyed(),
        filter((keyword) => keyword),
        debounceTime(2000),
        switchMap((keyword) => {
          this.siteService.showLoading();
          return this.countryService.getCountryByName(keyword).pipe(
            retry(3),
            catchError((error) => {
              this.siteService.hideLoading();
              console.error(error);
              this.siteService.showSnackBar(error.message, 'Close');
              return EMPTY;
            })
          );
        })
      )
      .subscribe((value) => {
        this.siteService.hideLoading();
        console.log(value);
      });
  }
}
