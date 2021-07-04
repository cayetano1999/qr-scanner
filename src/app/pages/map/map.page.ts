import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  constructor(private router: ActivatedRoute) { }

  lat: number = 0;
  lng: number = 0;

  ngOnInit() {
    debugger;
    let geo: any = this.router.snapshot.paramMap.get('geo');
    if (geo) {
      geo = geo.split(',');
      this.lat = Number(geo[0]);
      this.lng = Number(geo[1]);
      console.log(this.lat, this.lng);
      this.ngAfterViewInit();
    }
  }

  ngAfterViewInit(): void {
    debugger;
    console.log('Aqui voy');
    mapboxgl.accessToken = 'pk.eyJ1IjoiamNheWV0YW5vIiwiYSI6ImNrcW5zNHA5MjBtcWYyeXNiM2FoMXIxeTYifQ.stS3MaxDsnpZm-tkyHV2ow';
    var coordinates = document.getElementById('coordinates');
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[this.lng, this.lat],
      zoom:18,
      bearing: -17.6,
    });

    map.on('load', () => {
      map.resize();
      var marker = new mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([this.lng, this.lat])
        .addTo(map);
         
        function onDragEnd() {
        var lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML =
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        }
         
        marker.on('dragend', onDragEnd);
    });

    

  }

}
