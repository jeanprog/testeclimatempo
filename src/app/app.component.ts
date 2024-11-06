import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityCordinatesService } from './_core/_services/CityCordinates.service';
import { WeatherService } from './_core/_services/Weather.Service';
import { Weather } from './_domain/_entities/weather.entity';
import { City } from './_domain/_entities/City.entity';
import { MapComponent } from './_components/map/map.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private serviceCordinates: CityCordinatesService,
    private serviceWeather: WeatherService
  ) {}
  city: string = '';
  lat!: string;
  lon!: string;
  ngOnInit() {
    /* this.searchCordinatesCity(this.city); */
  }
  changeCity(): void {
    // A variável pode ser modificada conforme necessidade
    this.city; // Atualiza o valor da cidade no campo de input
    this.searchCordinatesCity(this.city); // Chama a função para buscar coordenadas
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
      next: (city: City) => {
        console.log(city, 'depois do sub');
        this.lat = city.lat;
        this.lon = city.lon;
        this.searchWeather(city.lat, city.lon);
        // chamar o metodo que busca a previsão e marca o mapa

        if (!city) {
          return console.log('error ao obter a lista');
        }
      },
    });
  }

  title = 'spaclimatempo';
}
