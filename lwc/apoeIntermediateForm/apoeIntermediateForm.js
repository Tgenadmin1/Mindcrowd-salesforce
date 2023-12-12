import { LightningElement,wire, track, api  } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import Community_Url from '@salesforce/label/c.Community_Url';
import getCurrentContact from '@salesforce/apex/CustomLoginController.getCurrentContact';

export default class BeanGameForm1 extends NavigationMixin(LightningElement) {
    @api APOE_Game_Form_Text_1;
    @api APOE_Game_Form_Text_1_a;    
    @api APOE_Game_Form_Text_2;
    @api APOE_Game_Form_Text_3;
    @api APOE_Game_Form_Text_4;
    @api APOE_Game_Form_Text_5;
    @api APOE_Game_Form_Text_6;
    @api APOE_Game_Form_Text_7;
    @api APOE_Game_VIP_URL ='apoe-participant-consent-form-vip';
    lstcon;
    formattedDate;

    connectedCallback() {
        this.fetchData();
    }

    fetchData() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                const activationDate = new Date(this.lstcon.Activation_Date__c);
                const month = (activationDate.getMonth() + 1).toString().padStart(2, '0'); 
                const day = activationDate.getDate().toString().padStart(2, '0');
                const year = activationDate.getFullYear().toString();
                this.formattedDate = `${month}/${day}/${year}`;
                this.error = undefined;
                })
                .catch(error => {
                    this.error = error;
                    this.lstcon = undefined;
                    console.error('Error:', error); // Log the error message for debugging
                });
    }
    APOEGameClick() {
        this.navigateToUrl();
    }

    navigateToUrl() {
        this[NavigationMixin.Navigate](
            {
              type: "standard__webPage",
              attributes: {
                url: Community_Url+"/s/"+ this.APOE_Game_VIP_URL+"?participantcode="+this.lstcon.ParticipantCode__c+"&campaign=apoe"
              }
            },
            true // Replaces the current page in your browser history with the URL
          );
    }
}