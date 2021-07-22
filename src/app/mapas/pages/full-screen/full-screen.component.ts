import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


//var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');   -> De esta manera se importaba ANTES

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa {
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {    

    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ -60.6570097548917, -32.95735416477163 ], // mapBox -> Longitud/Latitud    GoogleMaps -> Latitud/Longitud
    zoom: 14
    });


  }

}
