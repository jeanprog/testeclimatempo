import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityCordinatesService } from './_core/_services/CityCordinates.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private serviceCordinates: CityCordinatesService) {}

  ngOnInit() {
    /* this.searchCordinatesCity('rio de janeiro'); já funciona*/
  }
  searchCordinatesCity(name: string) {
    this.serviceCordinates.getCityCoordinates(name).subscribe({
      next: (result) => {
        console.log(result, 'depois do sub');

        if (!result) {
          return console.log('error ao obter a lista');
        }
      },
    });
  }

  title = 'spaclimatempo';
}
