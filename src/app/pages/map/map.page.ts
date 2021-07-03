import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(private router: ActivatedRoute) { }
  lat: string = '';
  lng: string = '';

  ngOnInit() {
    debugger;
    let geo: any = this.router.snapshot.paramMap.get('geo');
    if (geo) {
      geo = geo.split(',');
      this.lat = geo[0];
      this.lng = geo[1];
      console.log(this.lat, this.lng);
    }
  }

}
