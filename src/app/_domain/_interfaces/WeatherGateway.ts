import { Observable } from 'rxjs';
import { Weather } from '../_entities/weather.entity';

export default interface WeatherGateway {
  getWeatherCoordinates(name: string): Observable<Weather>;
}
