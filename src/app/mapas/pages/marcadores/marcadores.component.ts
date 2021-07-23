import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li{
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  // Necesario para poder controlar el zoom en nuestro mapa
  // ViewChild nos permite hacer referencia a un elemento html
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 14;

  // longitud y latitud
  center: [number,number] = [ -60.6570097548917, -32.95735416477163 ];

  constructor() { }
  ngAfterViewInit(): void {
    // Nuestro mapa era UNDEFINED tanto en el constructor como en el onInit por eso utilizamos el ciclo AfterViewInit
    // console.log('AfterViewInit', this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, // mapBox -> Longitud/Latitud    GoogleMaps -> Latitud/Longitud
      zoom: this.zoomLevel
    });

    // una forma de crear marcadores personalizados
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';
    // dentro de .Marker() podemos especificar -> element: marketHtml -> Esto hace que en vez de mostrarse el pin se muestre el 'Hola mundo' de más arriba

    // crear instancia de marcador
    // const marker = new mapboxgl.Marker().setLngLat( this.center ).addTo( this.mapa );
  }

  ngOnInit(): void {
  }




  // FUNCIONES RELACIONADAS A LOS MARCADORES
  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    // al tenerlo como una constante tenemos una referencia directa de este objeto
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat( this.center ).addTo( this.mapa );

  }

  irAlMarcador(){
    console.log('Ir al marcador seleccionado');
  }

}
