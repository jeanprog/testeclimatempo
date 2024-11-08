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
import { ToastService } from './_core/_services/Toast.service';
import { ToastErrorComponent } from './_components/toast-error/toast-error.component';
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
    ToastErrorComponent,
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
  showErrorToast: boolean = false;
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private serviceCordinates: CityCordinatesService,
    private serviceWeather: WeatherService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.searchCordinatesCity('Ribeirão Preto');
    this.onCityInputChange();
    this.observerStateToast();
  }
  observerStateToast() {
    this.toastService.showToast$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (toastState) => {
        this.showErrorToast = toastState.show;
        this.errorMessage = toastState.message;
      },
    });
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
          if (value && value.length > 3) {
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

          if (citys.length === 0) {
            this.handleError('não encontramos sugestões de cidades ');
          }
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
  changeCity(): void {
    this.displayName;
    this.cityControl.reset();
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
  handleError(message: string) {
    console.log('chamou handle');
    this.toastService.showError(message);
  }
}
