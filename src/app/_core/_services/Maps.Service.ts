import { Injectable } from '@angular/core';
import L, { latLng, tileLayer, marker, Marker } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: any;
  private marker!: Marker;

  constructor() {}

  initMap(lat: number, lon: number, mapId: string): void {
    this.map = L.map(mapId).setView([lat, lon], 13);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.marker = marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Posição Inicial')
      .openPopup();
  }

  updateMap(lat: number, lon: number): void {
    if (this.map) {
      this.map.setView([lat, lon], 13); // Atualiza a visualização do mapa
    }

    if (this.marker) {
      this.marker.setLatLng([lat, lon]);
      this.marker.bindPopup(`Latitude: ${lat}, Longitude: ${lon}`).openPopup();
    }
  }
}
