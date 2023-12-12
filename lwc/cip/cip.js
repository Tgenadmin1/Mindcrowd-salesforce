import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import Community_Url from '@salesforce/label/c.Community_Url';

export default class Cip extends LightningElement {

    currentPageReference = null;
    urlStateParameters = null;
    urlId="";
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.urlStateParameters = currentPageReference.state;
            console.log('my urlStateParameters', this.urlStateParameters);
            this.setParametersBasedOnUrl();
        //  window.location.href = Community_Url + '/s/dlrts';
         }
    };

    setParametersBasedOnUrl() {
        this.urlId = this.urlStateParameters.cip || null;
        console.log('my urlId', this.urlId);
        if (this.urlId != null){
            document.cookie = 'cip = ' + this.urlId;
            console.log('document.cookie = ', document.cookie);
        }      
        else{
            this.urlId = "";
            console.log('my contactId', this.urlId);
        }
            
    };
}