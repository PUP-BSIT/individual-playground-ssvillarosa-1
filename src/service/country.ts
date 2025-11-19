import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Country {
  http = inject(HttpClient);

  getCountryByName(keyword: string) {
    const url = `https://restcountries.com/v3.1/name/${keyword}`;
    return this.http.get(url);
  }
}
