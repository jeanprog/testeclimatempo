import { map, Observable } from 'rxjs';
import { City } from '../_entities/City.entity';
import CityGateway from '../_interfaces/CityGateway';
import { HttpClient } from '@angular/common/http';
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
}
