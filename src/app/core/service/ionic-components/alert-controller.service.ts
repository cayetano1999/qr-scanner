import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertControllerService {

    constructor(private alertController: AlertController) {

    }

    async confirmation(
        ok: (params?: any) => void,
        message: string,
        title: string,
        confirmText: string,) {

        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: title,
            animated: true,
            message: message,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: confirmText,
                    handler: () => {
                        ok();
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();

    }


}
