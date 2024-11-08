import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MapService } from '../../_core/_services/Maps.Service';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, OnChanges {
  @Input() lat: string = '';
  @Input() lon: string = '';
  @Input() nameCity: string = '';
  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    // só pra dar uma padrão inicial mas poderia ser a localização atual.
    this.mapService.initMap(-23.5489, -46.6388, 'map');
  }

  ngOnChanges(): void {
    // Se as coordenadas mudaram, atualize o mapa
    if (this.lat && this.lon) {
      console.log(this.lat, this.lon);
      this.mapService.updateMap(
        parseFloat(this.lat),
        parseFloat(this.lon),
        this.nameCity
      );
    }
  }
}
