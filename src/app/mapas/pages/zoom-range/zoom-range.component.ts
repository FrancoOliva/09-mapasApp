import { AfterViewInit, Component, ElementRef,  ViewChild } from '@angular/core';
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
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  // Necesario para poder controlar el zoom en nuestro mapa
  // ViewChild nos permite hacer referencia a un elemento html
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 10;

  constructor() { 
    
  }

  ngAfterViewInit(): void {
    // Nuestro mapa era UNDEFINED tanto en el constructor como en el onInit por eso utilizamos el ciclo AfterViewInit
    // console.log('AfterViewInit', this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -60.6570097548917, -32.95735416477163 ], // mapBox -> Longitud/Latitud    GoogleMaps -> Latitud/Longitud
      zoom: this.zoomLevel
    });

    // EventListeners del mapa para obtener el valor del zoom correctamente
    this.mapa.on('zoom', (ev) =>{ this.zoomLevel = this.mapa.getZoom(); });

    // Controlamos con un condicional que no pase los 18 de zoom (max 22)
    this.mapa.on('zoomend', (ev) =>{ 
      if ( this.mapa.getZoom() > 18 ){
        // zoomTo nos permite mover el zoom a un punto
        this.mapa.zoomTo( 18 );
      }
    });
    
  }

  zoomOut(){
    this.mapa.zoomOut();
    
  }

  zoomIn(){
    this.mapa.zoomIn();
    
  }

  valorZoomRange( valor: string ){
    // convertimos a tipo number
    this.mapa.zoomTo( Number(valor) );
  }

}
