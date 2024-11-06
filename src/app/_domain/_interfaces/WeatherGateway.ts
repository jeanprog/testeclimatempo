import { Observable } from 'rxjs';
import { Weather } from '../_entities/weather.entity';

export default interface WeatherGateway {
  getWeather(lat: number, lon: number): Observable<Weather>;
}
