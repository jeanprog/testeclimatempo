import { Observable } from 'rxjs';
import { City } from '../_entities/City.entity';

export default interface CityGateway {
  getCityCoordinates(name: string): Observable<City>;
}
