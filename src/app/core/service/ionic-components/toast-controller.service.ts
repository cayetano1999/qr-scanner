import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastControllerService {

  constructor(private toastController: ToastController) {

  }

  async showToast(message: string){
    const toast = await this.toastController.create({
      animated: true,
      message: message,
      translucent: true,
      duration: 4000,
      position: 'middle'
    });

    toast.present();
  }

  async showToastSuccess(message: string){
   const toast = await this.toastController.create({
      animated: true,
      message: message,
      translucent: true,
      duration: 4000,
      position: 'top',
      color: 'success',
    });
    toast.present();

  }

  async showToastError(message: string){
    const toast = await this.toastController.create({
      animated: true,
      message: message,
      translucent: true,
      duration: 5000,
      position: 'top',
      color: 'danger',
    });
    
    toast.present();
  }

  async showToastWarning(message: string){
    const toast = await this.toastController.create({
      animated: true,
      message: message,
      translucent: true,
      duration: 5000,
      position: 'top',
      color: 'warning',
    });
    
    toast.present();
  }
}
