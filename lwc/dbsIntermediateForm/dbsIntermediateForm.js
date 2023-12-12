import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import Community_Url from '@salesforce/label/c.Community_Url';
import getCurrentContact from '@salesforce/apex/CustomLoginController.getCurrentContact';

export default class BeanGameForm1 extends NavigationMixin(LightningElement) {
    @api DBS_Bean_Game_Form_Text_1;
    @api DBS_Game_Form_Text_1_a;    
    @api DBS_Bean_Game_Form_Text_2;
    @api DBS_Bean_Game_Form_Text_3;
    @api DBS_Bean_Game_Form_Text_4;
    @api DBS_Bean_Game_Form_Text_5;
    @api DBS_Game_VIP_URL;
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
    DBSGameClick() {
        this.navigateToUrl();
    }

    navigateToUrl() {
        this[NavigationMixin.Navigate](
            {
              type: "standard__webPage",
              attributes: {
                url: Community_Url+"/s/"+this.DBS_Game_VIP_URL+"?participantcode="+this.lstcon.ParticipantCode__c+"&campaign=dbs"
              }
            },
            true // Replaces the current page in your browser history with the URL
          );
    }
}