import { LightningElement, track, wire,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import consent_text_4 from '@salesforce/label/c.consent_text_4';
import consent_text_6 from '@salesforce/label/c.consent_text_6';
import consent_text_7 from '@salesforce/label/c.consent_text_7';
import consent_text_8 from '@salesforce/label/c.consent_text_8';
import consent_text_9 from '@salesforce/label/c.consent_text_9';
import consent_text_9a from '@salesforce/label/c.consent_text_9a';
import consent_text_10 from '@salesforce/label/c.consent_text_10';
import consent_text_11 from '@salesforce/label/c.consent_text_11';
import consent_text_12 from '@salesforce/label/c.consent_text_12';
import consent_text_13 from '@salesforce/label/c.consent_text_13';
import consent_text_14 from '@salesforce/label/c.consent_text_14';
import consent_text_15 from '@salesforce/label/c.consent_text_15';
import step_1 from '@salesforce/label/c.step_1';
import step_2 from '@salesforce/label/c.step_2';
import step_3 from '@salesforce/label/c.step_3';
import step_4 from '@salesforce/label/c.step_4';


import Community_language_Url from '@salesforce/label/c.Community_language_Url';
import url_consent from '@salesforce/label/c.url_consent';
import { CurrentPageReference } from 'lightning/navigation';
import url_aboutyourbrain from '@salesforce/label/c.url_aboutyourbrain';
import testlanguage_ES from '@salesforce/label/c.testlanguage_ES';
import testlanguage_EN from '@salesforce/label/c.testlanguage_EN';



export default class Testlanguage extends LightningElement {
    @api consent_text_1 = "WHICH LANGUAGE WOULD YOU LIKE TO TAKE THE TEST IN? TAKE YOUR PICK!";
    @api consent_text_2 = "The test is currently available in English and Spanish.";
    @api consent_text_3 = "Note: Some bilingual people have reported that taking the test in their maternal language was easier than taking it in their second language.";
    @api consent_text_5 = "CLICK HERE TO START";
    urlStateParameters = null;
    currentPageReference;
    //subId = null;
    //@wire(CurrentPageReference)
    // getStateParameters(currentPageReference) {
    //    if (currentPageReference) {
    //     this.subId = currentPageReference.state?.subid;
    //     localStorage.setItem('subIdToStoreLocal', this.subId);
    //     //alert( localStorage.getItem('subIdToStoreLocal') );
    //    }
    // }

   
   
    @track valueConsent = '';
    renderedCallback(){
        if(document.getElementsByTagName("html")[0].getAttribute("lang")=='en-US'){
            this.valueConsent = 'en_US';
        }
        else if(document.getElementsByTagName("html")[0].getAttribute("lang")=='es'){
            this.valueConsent = 'es';
        }
    }
    
    tempLang;
    label = {
        
        consent_text_4,
        
        consent_text_6,
        consent_text_7,
        consent_text_8,
        consent_text_9a,
        consent_text_9,
        consent_text_10,
        consent_text_11,
        consent_text_12,
        consent_text_13,
        consent_text_14,
        consent_text_15,
        step_1,
        step_2,
        step_3,
        step_4,
				
    }
    

    submitDetails() {
        this.isModalOpen = false;
        document.querySelector("body").style.overflow = 'visible';
        this.isModalOpen= false;
        window.location.href =  url_consent;
    }

    get optionsConsent() {
        return [
            // { label: 'English', value: 'English' },
            // { label: 'Español', value: 'Español' }
            { label: 'English', value: 'en_US' },
            { label: 'Español', value: 'es' }
        ];
        
    }

    handleChangeConsent(event) {
        this.valueConsent = event.detail.value;
        this.tempLang = event.detail.value;
        this.tempEnLang;
       
        if(document.getElementsByTagName("html")[0].getAttribute("lang") == "en-US")
        {
            this.tempEnLang= "en_US";
        }else{
            this.tempEnLang= "es"; 
        }
        if(this.tempLang == 'en_US'){
            window.location.href = Community_language_Url + "/s/" + testlanguage_EN;
        }else{
            window.location.href = Community_language_Url + "/s/" + testlanguage_ES;
        }


      }


}