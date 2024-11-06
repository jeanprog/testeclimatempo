import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Weather } from '../../_domain/_entities/weather.entity';
import WeatherGateway from '../../_domain/_interfaces/WeatherGateway';
import { WeatherHttpRepository } from '../../_domain/_repositores/WeatherHttp.Repository';
@Injectable({
  providedIn: 'root', // Registra automaticamente no root
})
export class WeatherService implements WeatherGateway {
  constructor(private repositoryWeather: WeatherHttpRepository) {}
  getWeather(lat: string, lon: string): Observable<Weather> {
    const weather = this.repositoryWeather.getWeather(lat, lon);
    console.log(weather);
    return weather;
  }
}
