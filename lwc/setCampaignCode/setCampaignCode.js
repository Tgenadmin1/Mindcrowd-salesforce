import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import Community_Url from '@salesforce/label/c.Community_Url';

export default class SetCampaignCode extends LightningElement {
    currentPageReference = null;
    urlStateParameters = null;
    campaignCode='';

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.campaignCode = currentPageReference.state.campaigncode;
            console.log('campaigncode: ', this.campaignCode);
            // document.cookie = 'cmpgn_tg=' + this.campaignCode;
            if(this.campaignCode.length > 20){
                this.campaignCode = this.campaignCode.substring(0, 20);
            }

            localStorage.setItem('campaigncode', this.campaignCode);
           // console.log('localStorage.campaigncode: ', localStorage.getItem('campaigncode'));
            window.location.href = Community_Url + "/s"; 
        }
        else {
            console.log('I am having wrong pagereference.');
        }
    };



}