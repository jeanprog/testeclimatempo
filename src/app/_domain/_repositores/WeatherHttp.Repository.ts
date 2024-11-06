import { Observable } from 'rxjs';
import { Weather } from '../_entities/weather.entity';
import WeatherGateway from '../_interfaces/WeatherGateway';

export class WeatherRepository implements WeatherGateway {
  getWeather(lat: number, lon: number): Observable<Weather> {
    throw new Error('Method not implemented.');
  }
}
