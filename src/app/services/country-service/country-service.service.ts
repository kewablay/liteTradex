import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) =>
        data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
          currency: country.currencies ? Object.keys(country.currencies)[0] : null,
        }))
      )
    );
  }
}
