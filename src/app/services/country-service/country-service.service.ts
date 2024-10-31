import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private supportedCurrencies = ['USD', 'GHS', 'XOF', 'NGN']; // Dollar, Cedis, Cefa, Naira

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) =>
        data
          .filter((country: any) => {
            const countryCurrency = country.currencies
              ? Object.keys(country.currencies)[0]
              : '';
            return this.supportedCurrencies.includes(countryCurrency);
          })
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            currency: Object.keys(country.currencies)[0],
          }))
      )
    );
  }
}
