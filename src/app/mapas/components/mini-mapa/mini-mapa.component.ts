import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
    div {
      width: 100%;
      height: 150px;
      margin: 0;
    }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [ 0 , 0 ];

  @ViewChild('mapa') divMapa!: ElementRef;

  constructor(){}

  ngAfterViewInit(): void {
    
    var mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat, // mapBox -> Longitud/Latitud    GoogleMaps -> Latitud/Longitud
      zoom: 14,
      interactive: false
    
    });

    // Creamos marcador en la posición recibida por Input
    new mapboxgl.Marker().setLngLat( this.lngLat ).addTo( mapa );
    
  }

  

}
