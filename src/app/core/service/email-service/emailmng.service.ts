import { Injectable } from "@angular/core";
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { File } from "@ionic-native/file/ngx";

@Injectable({
    providedIn: 'root'
})

export class EmailMngService {

    /**
     *
     */
    constructor(private emailComposer: EmailComposer, private fileService: File) {

    }

    async sendEmail(fileName: string, to: string) {
        this.emailComposer.getClients().then((apps: []) => {
            console.log('APPS', apps)
        });

        const dir = `${this.fileService.dataDirectory}${fileName}`

        const email = {
            to: to,
            // cc: 'josuecayetano@hotmail.com',
            // bcc: ['john@doe.com', 'jane@doe.com'],
            attachments: [
                dir
            ],
            subject: 'Scanners History',
            body: 'Tu listado de Scanners',
            isHtml: true
        }

        // Send a text message using default options
        return this.emailComposer.open(email);

    }
}

