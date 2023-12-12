import { LightningElement, api, track } from 'lwc';
//import qrcode from '@salesforce/resourceUrl/qrcode';
import barcode from '@salesforce/resourceUrl/Barcodegenerator';
import { loadScript } from 'lightning/platformResourceLoader';
import qrcode from './qrcode.js';

export default class QrCodeGeneration extends LightningElement {

    @api shippingid;
    @api qrcodeIds;
    @track qrcodeList;
    renderedCallback() {
        console.log('---type of variables', this.qrcodeIds);
        let qrcodeList = JSON.parse(JSON.stringify(this.qrcodeIds));
        this.generateQRcode(qrcodeList);
    }
    printQRcode() {
        window.print();
    }
    generateQRcode(qrcodeList) {
        // console.log('qrcodeList-----',qrcodeList);
        for (var i = 0; i < qrcodeList.length; i++) {
            let qrCodeGenerated = new qrcode(0, 'H');
            // console.log('iterator QRcode----',qrcodeList[i]);
            var str = qrcodeList[i];
            // console.log('str = ', str);
            if (str.includes('https')) {
                qrCodeGenerated.addData(qrcodeList[i]);
                //console.log('last--qrCodeGenerated----',qrCodeGenerated);
                qrCodeGenerated.make();
                const element = this.template.querySelector('.qrcodeClass');
                const element2 = this.template.querySelector('.barcodeClass');
                element.outerHTML = qrCodeGenerated.createSvgTag({});
                element2.outerHTML = qrcodeList[i + 1];
                //  console.log('last--element----', element.outerHTML);
            }


        }

    }


}