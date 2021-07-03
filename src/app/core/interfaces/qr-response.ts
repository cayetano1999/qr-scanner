export class BarcodeScanResult {
    // format: 'QR_CODE' | 'DATA_MATRIX' | 'UPC_E' | 'UPC_A' | 'EAN_8' | 'EAN_13' | 'CODE_128' | 'CODE_39' | 'CODE_93' | 'CODABAR' | 'ITF' | 'RSS14' | 'RSS_EXPANDED' | 'PDF_417' | 'AZTEC' | 'MSI';
    format: string = '';
    cancelled: boolean = true;
    text: string = '';
    icon: string = '';
    created: Date = new Date();
    type: string = '';

    /**
     *
     */
    constructor(format: string, text: string, cancel: boolean) {
        this.cancelled = cancel;
        this.text = text;
        this.determinateType();
    }

    private determinateType() {
        if (this.cancelled) {
            return;
        }
        const startText = this.text.substr(0, 4).toLowerCase();
        debugger;
        switch (startText) {
            case 'http':
                this.type = 'http';
                this.icon = 'globe-outline';
                break;
            case 'geo':
                this.type = 'HTTP';
                this.icon = 'pin';
                break;
            case 'smst':
                this.type = 'SMS';
                this.icon = 'chatbox-outline';
                break
            default:
                this.type = 'Not Available';
                this.icon = 'add';
        }
    }
}