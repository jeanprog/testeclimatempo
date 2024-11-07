import { map, Observable } from 'rxjs';
import { Weather } from '../_entities/weather.entity';
import WeatherGateway from '../_interfaces/WeatherGateway';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class WeatherHttpRepository implements WeatherGateway {
  constructor(private http: HttpClient) {}
  private apiKey = environment.OPENWEATHERMAP_API_KEY;
  private baseUrl = environment.OPENWEATHERMAP_BASE_URL;
  getWeather(lat: string, lon: string): Observable<Weather> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&&lang=pt`;
    return this.http.get<any>(url).pipe(
      map((data) => {
        return {
          temperature: data.main.temp,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
          temp: data.weather[0].main,
        } as Weather;
      })
    );
  }
}
