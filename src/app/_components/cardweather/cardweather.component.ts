import { Component, Input, SimpleChanges } from '@angular/core';

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
  @Input() temp!: string;
  icontype: string = '';

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Sempre que qualquer valor de @Input mudar, chamar a função para atualizar o ícone
    if (changes['temp']) {
      this.iconMoment();
      console.log(this.icontype);
    }
  }
  iconMoment() {
    switch (this.temp) {
      case 'Clear':
        this.icontype = 'brightness_7'; // Ícone para "Clear"
        break;

      case 'Clouds':
        this.icontype = 'filter_dramas'; // Ícone para "Clouds"
        break;

      case 'Rain':
        this.icontype = 'brightness_7'; // Ícone para "Rain"
        break;

      case 'Thunderstorm':
        this.icontype = 'flash_on'; // Ícone para "Thunderstorm"
        break;

      default:
        this.icontype = 'looks'; // Ícone para clima desconhecido
        break;
    }
  }
}
