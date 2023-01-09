import { Component } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class ByCountryComponent {
  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];

  constructor(private countryService: CountryService) {}

  search(term: string) {
    this.isError = false;
    this.term = term;
    this.suggestedCountries = [];
    this.countryService.searchCountry(this.term).subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (err) => {
        this.isError = true;
        this.countries = [];
      },
    });
  }
  
  suggestions(term: string) {
    this.isError = false;
    this.term = term;
    this.countryService.searchCountry(term).subscribe({
      next: (countries) => {
        this.suggestedCountries = countries.splice(0, 5);
      },
      error: (err) => {
        this.suggestedCountries = [];
      },
    });
  }
}
