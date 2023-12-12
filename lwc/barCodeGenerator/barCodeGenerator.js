// Created By: {Girikon(Shweta Khunteta)}
// Created On: 17/07/2021
// Description/Purpose: Why and where it is used [tm-22]: It is used on Generate barcode button 
// on list view to generate barcode with the help of JsBarcode library.

import { api, LightningElement } from 'lwc';
import barcode from '@salesforce/resourceUrl/Barcodegenerator';
import { loadScript } from 'lightning/platformResourceLoader';



export default class BarCodeGenerator extends LightningElement {

@api shippingid;
@api barcodeIds;
barcodeArray=[];
boolShowSpinner=true;


printBarcode() {
    window.print();
}
    connectedCallback() {
        console.log('---type of variables');
      
     let barcodeList = JSON.parse(JSON.stringify(this.barcodeIds))
    console.log(barcodeList); 
    
        
     
        Promise.all([
            
            loadScript(this, barcode)
        ]).then(() => {
           // this.renderButtons();
            this.generateBarcode();
        }).catch(error => {
            window.console.log("Error " + error.body.message);
        });
       

    }
    renderButtons() {
        this.boolShowSpinner = false;
    }
    
   
    generateBarcode() {
       
       
        var barcodeList = JSON.parse(JSON.stringify(this.barcodeIds));
        console.log(barcodeList);
        for(var i=0;i<barcodeList.length;i++){
            console.log(barcodeList[i]);
        const canvas = this.template.querySelector('[data-id='+barcodeList[i]+']');
        JsBarcode(canvas, barcodeList[i], {
            format: "CODE128",
            height: 60
            
           
        });
        JsBarcode('.'+barcodeList[i]).init();

    }this.boolShowSpinner=false;
    }
}