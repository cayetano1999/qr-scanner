import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BarcodeScanResult } from 'src/app/core/interfaces/qr-response';
import { ToastControllerService } from 'src/app/core/service/ionic-components/toast-controller.service';
import { DataLocalService } from 'src/app/core/service/storage-service/storage.service';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  scanners: Array<BarcodeScanResult> = [];

  constructor(private iab: InAppBrowser, private router: Router, private storageService: DataLocalService, private toast: ToastControllerService, private str: Storage) { }


  ionViewWillEnter() {
    console.log('Va a entrar');
    this.load();
  }

  goToAdd() {
    this.router.navigate(['/tabs/tab1']);
  }

  clear() {
    this.storageService.clear().then(r => {
      this.toast.showToastSuccess('Historial Eliminado');
      this.load();
    })
  }

  load() {
    this.str.create().then(async r => {
      this.scanners = await this.storageService.GetAllItem();
      if (this.scanners == null) {
        this.scanners = [];
      }
      console.log('Historial', this.scanners);
    })
  }

  showInWeb(item: BarcodeScanResult) {
    //40.73151796986687 -74.060887294062502
    switch (item.type.toLowerCase()) {
      case 'http':
        this.iab.create(item.text, '_system');
        break
        case 'geo':
          debugger;
          let value = item.text.split('?q=');
        this.router.navigate([`/tabs/map/${value[1]}`])
        break
        default:
          this.toast.showToastWarning('este scanner no puede ser seleccionado por el momento')
          break
    }

  }
}
