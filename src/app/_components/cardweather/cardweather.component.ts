import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'cardweather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardweather.component.html',
})
export class CardweatherComponent {
  @Input() temperature!: number;
  @Input() tempMin!: number;
  @Input() tempMax!: number;
  @Input() humidity!: number;
  @Input() windSpeed!: number;
  @Input() description!: string;
  @Input() temp!: string;
  icontype: string = '';
  iconColor: string = '';

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Sempre que qualquer valor de @Input mudar, chamar a função para atualizar o ícone
    if (changes['temp']) {
      this.iconMoment();
      this.updateIconColor();
      console.log(this.icontype);
    }
  }
  iconMoment() {
    switch (this.temp) {
      case 'Clear':
        this.icontype = 'brightness_7';
        break;

      case 'Clouds':
        this.icontype = 'cloud';
        break;

      case 'Rain':
        this.icontype = 'rainy_snow';
        break;

      case 'Thunderstorm':
        this.icontype = 'thunderstorm';
        break;

      default:
        this.icontype = 'looks';
        break;
    }
  }
  updateIconColor() {
    switch (this.temp) {
      case 'Clear':
        this.iconColor = 'text-yellow-500';
        break;
      case 'Clouds':
        this.iconColor = 'text-gray-500';
        break;
      case 'Rain':
        this.iconColor = 'text-slate-400';
        break;
      case 'Thunderstorm':
        this.iconColor = 'text-slate-500';
        break;
      default:
        this.iconColor = 'text-slate-500';
        break;
    }
  }
}
