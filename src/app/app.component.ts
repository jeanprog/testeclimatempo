import { Component, OnDestroy } from '@angular/core';
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
import { convertWindSpeedToKmh } from './_utils/helpers';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapComponent,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    CardweatherComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  suggestions: CitySuggestion[] = [];
  weatherData!: Weather;
  city: string = '';
  cityControl = new FormControl('');
  displayName: string = '';
  lat!: string;
  lon!: string;
  nameCity!: string;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private serviceCordinates: CityCordinatesService,
    private serviceWeather: WeatherService
  ) {}

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Called when the component is initialized.
   * Calls the searchCordinatesCity method with the initial city value.
   */
  /******  2cd60381-f69b-4e3e-aae5-569a15a36eef  *******/
  ngOnInit() {
    this.searchCordinatesCity('Ribeirão Preto');
    this.onCityInputChange();
    /* this.searchCordinatesCity(this.city); */
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onCitySelected(suggestion: CitySuggestion) {
    console.log('Cidade selecionada:', suggestion.name);
    this.city = suggestion.name;
    this.displayName = suggestion.displayName;
    this.suggestions = [];
    this.changeCity();
  }

  onCityInputChange(): void {
    console.log('fez algo');
    this.cityControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          if (value && value.length > 4) {
            this.isLoading = true;
            return this.serviceCordinates.getCitySuggestions(value);
          } else {
            this.clearSuggestions();
            return [];
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (citys: CitySuggestion[]) => {
          this.suggestions = citys;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Erro ao buscar sugestões de cidade:', err);
          this.isLoading = false;
        },
      });
  }
  clearSuggestions(): void {
    this.suggestions = [];
    this.isLoading = false;
  }

  /* onCityInputChange(){
    this.isLoading === true;
    if (this.city.length > 4) {
      this.serviceCordinates.getCitySuggestions(this.city).subscribe({
        next: (citys: CitySuggestion[]) => {
          console.log(citys, 'ver saida aqui');
          this.suggestions = citys;
          this.isLoading === false;
        },
        error: (err: any) => {
          console.error('Erro ao buscar sugestões de cidade:', err);
        },
      });
    } else {
      this.suggestions = [];
    }
  }

 */ changeCity(): void {
    this.displayName;
    this.searchCordinatesCity(this.displayName);
  }

  searchWeather(lat: string, lon: string) {
    this.serviceWeather.getWeather(lat, lon).subscribe({
      next: (weather: Weather) => {
        if (!weather) {
          return console.log('error ao obter a lista');
        }
        this.weatherData = new Weather(
          parseFloat(weather.temperature.toFixed(0)),
          weather.tempMin,
          weather.tempMax,
          weather.humidity,
          convertWindSpeedToKmh(weather.windSpeed),
          weather.description,
          weather.temp
        );
        console.log(this.weatherData);
      },
    });
  }

  searchCordinatesCity(cityName: string) {
    console.log(cityName, 'antes do sub');
    this.isLoading = true;
    this.serviceCordinates.getCityCoordinates(cityName).subscribe({
      next: (dataCity: City) => {
        console.log(dataCity, 'depois do sub');
        this.lat = dataCity.lat;
        this.lon = dataCity.lon;
        this.nameCity = dataCity.name;
        this.searchWeather(dataCity.lat, dataCity.lon);
        this.city = '';
        this.suggestions = [];
        this.isLoading = false;
        // chamar o metodo que busca a previsão e marca o mapa

        if (!dataCity) {
          return console.log('error ao obter a lista');
        }
      },
    });
  }

  title = 'spaclimatempo';
}
