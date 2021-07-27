import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

// Interface necesaria para poder recuperar el color del marcador
interface colorMarcador {
  color: string;
  marcador?: mapboxgl.Marker;
  centro?: [number,number];
}

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

  // arreglo de marcadores
  marcadores: colorMarcador[] = [];

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

    // Recuperamos los marcadores guardados en el localStorage
    this.leerLocalStorage();
  }

  
  // FUNCIONES RELACIONADAS A LOS MARCADORES
  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    // al tenerlo como una constante tenemos una referencia directa de este objeto
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat( this.center ).addTo( this.mapa );

    // agregamos los marcadores creados a un arreglo
    this.marcadores.push({
      color,
      marcador: nuevoMarcador
    });

    // console.log(this.marcadores); 

    // CADA VEZ QUE SE CREA UN MARCADOR LO GUARDAMOS EN LOCALSTORAGE
    this.guardarMarcadoresLocalStorage();

    // Cada vez que terminamos de mover un marcador se guarda su nueva posición
    nuevoMarcador.on('dragend', () =>{
      this.guardarMarcadoresLocalStorage();
    });

  }

  irAlMarcador(marcador: mapboxgl.Marker){
    
    this.mapa.flyTo({
      center: marcador.getLngLat(), // método para obtener la lng y lat de nuestro marcador
      essential: true
    });
  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr: colorMarcador[] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marcador!.getLngLat();

      lngLatArr.push({
        color: m.color,
        centro: [ lng , lat ],
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr) );
    
  }

  leerLocalStorage(){

    // Nos fijamos si en el localStorage hay algo
    if ( !localStorage.getItem('marcadores') ){
      return;
    }

    // Capturamos lo que hay en el localStorage en un arreglo
    // Con el ! le decimos a typescript que siempre vamos a tener un valor ( arrojaba error de string | null )
    // porque hicimos la validación más arriba
    const lngLat: colorMarcador[] = JSON.parse( localStorage.getItem('marcadores')! );

    // Agregamos los marcadores a un arreglo para poder utilizarlos y verlos en el mapa
    lngLat.forEach( m =>{

      const nuevosMarcadores = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat( m.centro! )
      .addTo( this.mapa );

      this.marcadores.push({
        marcador: nuevosMarcadores,
        color: m.color
      });

      // Cada vez que terminamos de mover un marcador se guarda su nueva posición
      nuevosMarcadores.on('dragend', () =>{
        this.guardarMarcadoresLocalStorage();
      });

    });
    
  }

  borrarMarcador( i:number ){
    
    this.marcadores[i].marcador?.remove();  // Borramos físicamente del mapa el marcador
    this.marcadores.splice( i, 1 );         // Borramos el marcador de nuestro arreglo de marcadores

    this.guardarMarcadoresLocalStorage();   // Después de borrar algún marcador, guardamos nuevamente en localStorage
  }

}
