import { Injectable } from "@angular/core";
import { BarcodeScanResult } from "../../interfaces/qr-response";
import { File } from '@ionic-native/file/ngx';
import { EmailMngService } from "../email-service/emailmng.service";

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    constructor(private fileService: File, private emailService: EmailMngService) {
    }

    prepareFile(scanners: Array<BarcodeScanResult>) {
        const temp = [];
        const tiles = 'Tipo, Formato, Fecha, Texto\n';
        temp.push(tiles);
        scanners.forEach(s => {
            const linea = `${s.type}, ${s.format}, ${s.created}, ${s.text.replace(',', ' ')}\n`
            temp.push(linea);
        });
        console.log(temp.join(''))
        this.crateFile(temp.join(''));
    }

    crateFile(text: string) {
        this.fileService.checkFile(this.fileService.dataDirectory, 'registros.csv').then(r => {
            console.log('existe?', r);
            return this.writeFile(text);
        }).catch(err => {
            console.log('No existe');
            this.fileService.createFile(this.fileService.dataDirectory, 'registros.csv', false)
                .then(result => { this.writeFile(text) }).catch(err => {
                    console.log('Error');
                })
        })
    }

    async writeFile(text: string) {
        await this.fileService.writeExistingFile(this.fileService.dataDirectory, 'registros.csv', text);
        console.log('Creado');
        this.emailService.sendEmail('registros.csv', 'josuecayetano@hotmail.com').then(r=> {
            console.log(r);
        });

    }
}



