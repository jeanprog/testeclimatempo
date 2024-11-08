import { map, Observable } from 'rxjs';
import { City } from '../_entities/City.entity';
import { CitySuggestion } from '../_entities/CitySuggestion.entity';
import CityGateway from '../_interfaces/CityGateway';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class CityHttpRepository implements CityGateway {
  private urlNominatim = environment.apiNomatin;

  constructor(private http: HttpClient) {}

  getCityCoordinates(name: string): Observable<City> {
    return this.http
      .get<any[]>(`${this.urlNominatim}q=${name}&format=json&limit=1`)
      .pipe(
        map((response: any[]) => {
          const cityData = response[0];
          return {
            name: cityData.name,
            lat: cityData.lat,
            lon: cityData.lon,
          } as City;
        })
      );
  }
  getCitySuggestions(query: string): Observable<CitySuggestion[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('format', 'json')
      .set('addressdetails', '1')
      .set('limit', '5');

    return this.http
      .get<any[]>(this.urlNominatim, { params })
      .pipe(
        map((results: any[]) =>
          results.map(
            (item) =>
              new CitySuggestion(
                item.name,
                item.address.state || 'N/A',
                item.address.country,
                item.display_name
              )
          )
        )
      );
  }
}
