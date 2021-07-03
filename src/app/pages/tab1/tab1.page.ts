import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  result: string;

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  }

  constructor(private scanner: BarcodeScanner) { }
  ngOnInit(): void {
  }

  ionViewWillEnter() {
    console.log('Va a entrar');
    this.startScan();
  }

  startScan() {
    this.scanner.scan().then(data => {
      console.log('Data', data);
      this.result = data.text;
    }).catch(err => {
      console.log('Error');
    });
  }

}
