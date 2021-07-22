import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }
    .row {
      background-color: white;
      border-radius: 6px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
    }
    `
  ]
})
export class ZoomRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'mapaZoomRange',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -60.6570097548917, -32.95735416477163 ], // mapBox -> Longitud/Latitud    GoogleMaps -> Latitud/Longitud
      zoom: 14
      });
    
  }

}
