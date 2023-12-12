import { LightningElement, track, api } from 'lwc';
import saveFile from '@salesforce/apex/bulkUpdateLwcController.saveFile';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//import SampleCsvFile1 from '@salesforce/resourceUrl/SampleCsvFile';
export default class BulkUpdateLwc extends LightningElement {
//fileii = SampleCsvFile1;
   @api recordid;
   @track fileName = '';
   @track showLoadingSpinner = false;
   @track isTrue = false;
   selectedRecords;
   filesUploaded = [];
   file;
   fileContents;
   fileReader;
   content;
   visible = false;
   MAX_FILE_SIZE = 1500000;

   get acceptedCSVNdxlsxFormats() {
    return ['.csv'];      
    }
 
   handleFilesChange(event) {
       if(event.target.files.length > 0) {
           this.filesUploaded = event.target.files;
           this.fileName = '<b>File Name: </b>' + event.target.files[0].name;
       }
   }

   handleSave() {
       if(this.filesUploaded.length > 0) {
           this.uploadHelper();
       }
       else {
           this.fileName = 'Please select a CSV file to upload!';
       }
       
       
        
   }

   uploadHelper() {
       this.file = this.filesUploaded[0];
      if (this.file.size > this.MAX_FILE_SIZE) {
           window.console.log('File Size is to long');
           return ;
       }
       this.showLoadingSpinner = true;
       this.fileReader= new FileReader();
       this.fileReader.onloadend = (() => {
           this.fileContents = this.fileReader.result;
           this.saveToFile();
       });
       this.fileReader.readAsText(this.file);
   }

   saveToFile() {
       saveFile({ base64Data: JSON.stringify(this.fileContents), cdbId: this.recordid})
       .then(result => {
           //if(result == true){
           console.log('result ====> ', result);
           //if(result === 0){ 
                 this.fileName = result ;
           this.showLoadingSpinner = false;
          

          /* }else{
              this.fileName = this.fileName + ' - Uploaded Successfully' + result;
           this.isTrue = false;
           this.showLoadingSpinner = false;
            
           //this.visible = true;
           let delay2 = 1000
           setTimeout(() => {this.visible = false; }, delay2 ); 
           
           }*/
           //this.visible = true;
          // let delay2 = 1000
           //setTimeout(() => {this.visible = false; }, delay2 ); 
           //}
           })
       .catch(error => {
           // if(result == null){
           console.log('error-->', error);
           this.dispatchEvent(
               new ShowToastEvent({
                   title: 'Error while uploading File',
                   message: error.message,
                   variant: 'error',
               }),
           );
           //}
       });
   }

   handleCancel(event){
        var url = window.location.href; 
        var value = url.substr(0,url.lastIndexOf('/') + 1);
        window.history.back();
        return false;
    }
//-------------------------for download----------------------------

@track hrefdata;  
exportToCSV() {  
     let columnHeader = ["Barcode__c", "APOE_Genotype__c"];  // This array holds the Column headers to be displayd 
     let csvIterativeData;  
     let csvSeperator  
     let newLineCharacter;  
     csvSeperator = ",";  
     newLineCharacter = "\n";  
     csvIterativeData = "";  
     csvIterativeData += columnHeader.join(csvSeperator);  
     csvIterativeData += newLineCharacter;  
     console.log("csvIterativeData", csvIterativeData); 
     //const csvfile=  SampleCsvFile; 
     //window.open(SampleCsvFile,'_blank');
     //URL = SampleCsvFile;
     //this.hrefdata = "/SampleCsvFile";  
   }  



}