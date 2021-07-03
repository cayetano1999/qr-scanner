import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanResult } from 'src/app/core/interfaces/qr-response';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  result: BarcodeScanResult;

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
      this.result = new BarcodeScanResult(data.format, data.text, data.cancelled);
        console.log('result', this.result)  
        this.result.format = data.format;
        this.result.created = new Date();
        this.result.text = data.text;

    }).catch(err => {
      console.log('Error');
    });
  }

}
