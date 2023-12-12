import { LightningElement,track,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import backOff from '@salesforce/apex/UnsubscribeCtrl.backOff';
import message from '@salesforce/label/c.Email_Optout_Message';
import Thank_you_Label from '@salesforce/label/c.Thank_you';

export default class Unsubscribe extends LightningElement {
    Unsubscribe_MSG = message;
    Thank_you = Thank_you_Label;
    guid = null;
    @track isBackOff;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {        
        if (currentPageReference) {
          this.guid = currentPageReference.state.id;
          console.log(this.guid);
          this.handleUnsubscribe();
       }
    };

    handleUnsubscribe(){
        backOff({guid:this.guid})
        .then(()=>{
            this.isBackOff = true;
        })
        .catch(error=>{
            console.error(error);
        })
    };
}