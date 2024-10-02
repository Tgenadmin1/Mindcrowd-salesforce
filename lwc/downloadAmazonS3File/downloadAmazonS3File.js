import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import getPresignedURL from '@salesforce/apex/AWSLambdaService.getUploadURL';

const FIELDS = ["Participant_Game_Info__c.Game_Name__r.Name", "Participant_Game_Info__c.Recording_File_Name__c"];

export default class LoadContact extends LightningElement {
  @api recordId;
  bucketName;
  fileName;

  @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
  wiredRecord({ error, data }) {
    if (error) {
      let message = "Unknown error";
      if (Array.isArray(error.body)) {
        message = error.body.map((e) => e.message).join(", ");
        console.log('Error message: '+message);
      } else if (typeof error.body.message === "string") {
        message = error.body.message;
        console.log('Error message: '+message);
      }
    } else if (data) {
      console.log('data :'+JSON.stringify(data));
      const gameName = data.fields.Game_Name__r.displayValue;
      this.fileName = data.fields.Recording_File_Name__c.value;
      if(gameName == "Tell Me"){
        this.bucketName = "tellme-mindcrowd";
      }
      if(gameName == "Tell Me More"){
        this.bucketName = "tellmemore-mindcrowd";
      }      
      console.log('bucketName: '+this.bucketName);
      console.log('fileName: '+this.fileName);
      //this.dispatchCloseEvent();
      //this.handleOpenFile();
    }
  }

  handleOpenFile() {
    if (this.bucketName && this.fileName) {
        getPresignedURL({ bucketName: this.bucketName, fileName: this.fileName, namedCredential:'callout:AWS_S3_Download' })
            .then((response) => {
                window.open(response.downloadURL, '_blank');
            })
            .catch((error) => {
                console.error('Error getting presigned URL', error);
            });
    } else {
        console.error('Bucket name or file name is missing');
    }
}

dispatchCloseEvent() {
  const closeEvent = new CustomEvent('closequickaction', {
      bubbles: true,
      composed: true
  });
  this.dispatchEvent(closeEvent);
}

}