import { Component, Input } from '@angular/core';

@Component({
  selector: 'cardweather',
  standalone: true,
  imports: [],
  templateUrl: './cardweather.component.html',
})
export class CardweatherComponent {
  @Input() temperature!: number;
  @Input() tempMin!: number;
  @Input() tempMax!: number;
  @Input() humidity!: number;
  @Input() windSpeed!: number;
  @Input() description!: string;
}
