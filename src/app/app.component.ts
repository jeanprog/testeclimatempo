import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityCordinatesService } from './_core/_services/CityCordinates.service';
import { WeatherService } from './_core/_services/Weather.Service';
import { Weather } from './_domain/_entities/weather.entity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private serviceCordinates: CityCordinatesService,
    private serviceWeather: WeatherService
  ) {}

  ngOnInit() {
    /* this.searchCordinatesCity('rio de janeiro'); já funciona*/
    /*     this.searchWeather('-1.2043218', '-47.1583944'); */
  }

  searchWeather(lat: string, lon: string) {
    this.serviceWeather.getWeather(lat, lon).subscribe({
      next: (weather: Weather) => {
        console.log(weather);
        if (!weather) {
          return console.log('error ao obter a lista');
        }
      },
    });
  }

  searchCordinatesCity(name: string) {
    this.serviceCordinates.getCityCoordinates(name).subscribe({
      next: (result) => {
        console.log(result, 'depois do sub');
        // chamar o metodo que busca a previsão e marca o mapa

        if (!result) {
          return console.log('error ao obter a lista');
        }
      },
    });
  }

  title = 'spaclimatempo';
}
