import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {

    // Pequeña modificación para que accesToken no arroje error (en la documentación esta diferente)
    // Lo ponemos en appComponent para utilizarlo de manera global
    (mapboxgl as any ).accessToken = environment.mapBoxToken;
    
  }
  
  
}
