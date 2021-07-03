import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { BarcodeScanResult } from '../../interfaces/qr-response';
import { ToastControllerService } from '../ionic-components/toast-controller.service';


@Injectable({
    providedIn: 'root'
})
export class DataLocalService {


    
    constructor(private storage: Storage, private toast: ToastControllerService) {
        // this.getAll();
    }

    async addItem(model: BarcodeScanResult, results: BarcodeScanResult[]) {
        const exist = results.filter(n => n.text == model.text).length > 0;
        if (!exist) {
            results.unshift(model);
            await this.storage.set('scanners', results);
            this.toast.showToastSuccess('Guardado');
        }
        else {
            this.toast.showToastWarning('Ya has escaneado este código');
        }
    }


    existItem(model: BarcodeScanResult, results: BarcodeScanResult[]) {
        return results.filter(n => n.text == model.text).length > 0;
    }

    async setAsRemove(movies: BarcodeScanResult[]) {
        await this.storage.set('scanners', movies);
        this.toast.showToastSuccess('Scaneo Removido');
    }

    async GetAllItem() {
        return await this.storage.get('scanners');
    }


    async clear() {
        return await this.storage.clear();
    }

    async create() {
        return await this.storage.create();
    }
}
