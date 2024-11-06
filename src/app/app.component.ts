import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityCordinatesService } from './_core/_services/CityCordinates.service';
import { WeatherService } from './_core/_services/Weather.Service';
import { Weather } from './_domain/_entities/weather.entity';
import { City } from './_domain/_entities/City.entity';
import { MapComponent } from './_components/map/map.component';
import { FormsModule } from '@angular/forms';
import { CitySuggestion } from './_domain/_entities/CitySuggestion.entity';
import { NgFor } from '@angular/common';
import { CardweatherComponent } from './_components/cardweather/cardweather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapComponent,
    FormsModule,
    NgFor,
    CardweatherComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private serviceCordinates: CityCordinatesService,
    private serviceWeather: WeatherService
  ) {}
  suggestions: CitySuggestion[] = [];
  city: string = '';
  lat!: string;
  lon!: string;
  ngOnInit() {
    /* this.searchCordinatesCity(this.city); */
  }
  onCitySelected(suggestion: CitySuggestion) {
    console.log('Cidade selecionada:', suggestion.name);
    this.city = suggestion.name;
    this.suggestions = [];
    this.changeCity();
  }

  onCityInputChange() {
    if (this.city.length > 4) {
      this.serviceCordinates.getCitySuggestions(this.city).subscribe({
        next: (citys: CitySuggestion[]) => {
          console.log(citys);
          this.suggestions = citys;
        },
        error: (err: any) => {
          console.error('Erro ao buscar sugestões de cidade:', err);
        },
      });
    } else {
      this.suggestions = [];
    }
  }

  getCitySuggestions(name: string) {
    this.serviceCordinates.getCitySuggestions('rio de janeiro').subscribe({
      next: (data) => console.log(data),
    });
  }

  changeCity(): void {
    this.city;
    this.searchCordinatesCity(this.city);
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
        this.city = '';
        this.suggestions = [];
        // chamar o metodo que busca a previsão e marca o mapa

        if (!city) {
          return console.log('error ao obter a lista');
        }
      },
    });
  }

  title = 'spaclimatempo';
}
