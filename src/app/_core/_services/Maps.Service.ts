import { Injectable } from '@angular/core';
import L, { latLng, tileLayer, marker, Marker, Icon } from 'leaflet';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: L.Map; // Tipando corretamente como L.Map
  private marker!: Marker;

  constructor() {}

  initMap(lat: number, lon: number, mapId: string): void {
    console.log(lat, lon, 'verificando saida');
    this.map = L.map(mapId).setView([lat, lon], 6); // Inicializa o mapa com as coordenadas e o zoom

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.addCloudsLayer();
    // Definindo o ícone do marcador diretamente ao criar o marcador
    const icon = L.icon({
      iconUrl: 'assets/marker-icon.png', // Caminho para o ícone
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'assets/marker-shadow.png', // Caminho para a sombra do ícone
      shadowSize: [41, 41],
    });

    // Criando o marcador e adicionando-o ao mapa com o ícone personalizado
    this.marker = marker([lat, lon], { icon })
      .addTo(this.map)
      .bindPopup('Posição Inicial')
      .openPopup();
  }

  updateMap(lat: number, lon: number): void {
    console.log(lat, lon, 'teste no update');
    if (this.map) {
      this.map.setView([lat, lon], 13); // Atualiza a visualização do mapa
    }

    if (this.marker) {
      this.marker.setLatLng([lat, lon]); // Atualiza a posição do marcador
      this.marker.bindPopup(`Latitude: ${lat}, Longitude: ${lon}`).openPopup();
    }
  }

  addCloudsLayer(): void {
    // Adicionando a camada de nuvens diretamente
    const cloudLayerUrl = `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${environment.OPENWEATHERMAP_API_KEY}`; // Substitua "YOUR_API_KEY" pela chave da sua API

    tileLayer(cloudLayerUrl, {
      attribution:
        '&copy; <a href="https://openweathermap.org/city">OpenWeatherMap</a>',
      maxZoom: 19,
    }).addTo(this.map);
  }
}
