import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCurrentContact from '@salesforce/apex/CustomLoginController.getCurrentContact';
import community_url from '@salesforce/label/c.Community_Url';
import beangameviewformurl from '@salesforce/label/c.beangameviewformurl';
import hasDuplicateRecord from "@salesforce/apex/ContactController.hasDuplicateRecord";

export default class BeanGameForm1 extends NavigationMixin(LightningElement) {
    @api Bean_Game_Form_Text_1;
    @api Bean_Game_Form_Text_1_a;
    @api Bean_Game_Form_Text_2;
    @api Bean_Game_Form_Text_3;
    @api Bean_Game_Form_Text_4;
    @api Bean_Game_Form_Text_5;
    @api Bean_Game_VIP_URL='add-beangameparticipant-consent-vip'; 
    lstcon;
    formattedDate;
    selectform;

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
                hasDuplicateRecord({ conId: this.lstcon.Id,  campaign: 'bean game'})
                .then(result => {
                        console.log('bean: ' + result);
                        this.selectform =  result;                
                })
                .catch(error => {
                    this.error = error;
                });
            })
            .catch(error => {
                this.error = error;
                this.lstcon = undefined;
                console.error('Error:', error); // Log the error message for debugging
            });           
    }   
    
    BeanGameClick() {
        // Call the navigation function
        this.navigateToUrl();
    }

    navigateToUrl() {
        this[NavigationMixin.Navigate](
            {
              type: "standard__webPage",
              attributes: {
                url: community_url+"/s/"+this.Bean_Game_VIP_URL+"?participantcode="+this.lstcon.ParticipantCode__c+"&campaign=bean game"
              }
            },
            true // Replaces the current page in your browser history with the URL
          );
    }

    submitResults() {
        this[NavigationMixin.Navigate](
            {
              type: "standard__webPage",
              attributes: {
                url: community_url+"/s/"+beangameviewformurl+"?participantcode="+this.lstcon.ParticipantCode__c+"&campaign=bean game"
              }
            },
            true // Replaces the current page in your browser history with the URL
          );
    }
}