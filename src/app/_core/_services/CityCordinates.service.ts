import { catchError, map, Observable, of, throwError } from 'rxjs';
import { City } from '../../_domain/_entities/City.entity';

import CityGateway from '../../_domain/_interfaces/CityGateway';
import { CityHttpRepository } from '../../_domain/_repositores/CityHttp.Repository';
import { Injectable } from '@angular/core';
import { CitySuggestion } from '../../_domain/_entities/CitySuggestion.entity';
@Injectable({
  providedIn: 'root',
})
export class CityCordinatesService implements CityGateway {
  constructor(private repositoryCity: CityHttpRepository) {}
  getCityCoordinates(name: string): Observable<City> {
    return this.repositoryCity.getCityCoordinates(name).pipe(
      map((city: City) => {
        return city;
      }),
      catchError((error) => {
        console.error('Erro ao acessar a API', error);
        return throwError(() => new Error('Erro ao acessar a API'));
      })
    );
  }

  getCitySuggestions(query: string): Observable<CitySuggestion[]> {
    return this.repositoryCity.getCitySuggestions(query).pipe(
      map((results: CitySuggestion[]) => results),
      catchError((error) => {
        console.error('Erro ao buscar sugestões de cidade', error);
        return throwError(
          () => new Error('Erro ao buscar sugestões de cidade')
        );
      })
    );
  }
}
