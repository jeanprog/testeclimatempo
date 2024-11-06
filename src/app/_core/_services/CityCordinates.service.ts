import { Observable } from 'rxjs';
import { City } from '../../_domain/_entities/City.entity';

import CityGateway from '../../_domain/_interfaces/CityGateway';
import { CityHttpRepository } from '../../_domain/_repositores/CityHttp.Repository';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root', // Registra automaticamente no root
})
export class CityCordinatesService implements CityGateway {
  constructor(private repositoryCity: CityHttpRepository) {}

  getCityCoordinates(name: string): Observable<City> {
    const city = this.repositoryCity.getCityCoordinates(name);
    console.log(city);
    return city;
  }
}
