import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';
import { BarcodeScanResult } from 'src/app/core/interfaces/qr-response';
import { ToastControllerService } from 'src/app/core/service/ionic-components/toast-controller.service';
import { DataLocalService } from 'src/app/core/service/storage-service/storage.service';

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
  scanners: Array<BarcodeScanResult> = [];

  constructor(private router: Router, private scanner: BarcodeScanner, private storageService: DataLocalService, private toast: ToastControllerService, private str: Storage) {
    // this.getAll();
  }

  async ngOnInit() {
    this.str.create().then(async r => {
      this.scanners = await this.storageService.GetAllItem();
      if (this.scanners == null) {
        this.scanners = [];
      }
      console.log('Historial', this.scanners);
    })
  }


  ionViewWillEnter() {
    console.log('Va a entrar');
    this.startScan();
  }

  startScan() {
    this.result = null;
    this.scanner.scan().then(data => {
      console.log('Data', data);
      if(data.cancelled){
        this.toast.showToastError('Escaneo cancelado');
        return;
      }
      this.result = new BarcodeScanResult(data.format, data.text, data.cancelled);
      console.log('result', this.result)
      this.result.format = data.format;
      this.result.created = new Date();
      this.result.text = data.text;
      this.storageService.addItem(this.result, this.scanners);

    }).catch(err => {
      console.log('Error');
    });
  }

  redirectHistory(){
    this.router.navigate(['/tabs/tab2'])
  }

}
