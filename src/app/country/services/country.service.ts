import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiURL: string = 'https://restcountries.com/v3.1';

  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,cioc,cca3,flags,population');
  }

  constructor(private http: HttpClient) {}

  searchCountry(country: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${country}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${capital}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getCountryByCode(code: string): Observable<Country> {
    const url = `${this.apiURL}/alpha/${code}`;
    return this.http.get<Country>(url);
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
}
