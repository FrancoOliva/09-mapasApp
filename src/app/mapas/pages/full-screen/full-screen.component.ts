import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

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

    // Pequeña modificación para que accesToken no arroje error (en la documentación esta diferente)
    (mapboxgl as any ).accessToken = environment.mapBoxToken;

    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11'
    });


  }

}
