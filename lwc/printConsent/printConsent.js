import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import consent_text_1 from '@salesforce/label/c.consent_text_1';
import consent_text_2 from '@salesforce/label/c.consent_text_2';
import consent_text_3 from '@salesforce/label/c.consent_text_3';
import consent_text_4 from '@salesforce/label/c.consent_text_4';
import consent_text_5 from '@salesforce/label/c.consent_text_5';
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
import consent01 from '@salesforce/label/c.consent01';
import consent02 from '@salesforce/label/c.consent02';
import consent03 from '@salesforce/label/c.consent03';
import consent04 from '@salesforce/label/c.consent04';
import consent05 from '@salesforce/label/c.consent05';
import consent06 from '@salesforce/label/c.consent06';
import consent07 from '@salesforce/label/c.consent07';
import consent08 from '@salesforce/label/c.consent08';
import consent09 from '@salesforce/label/c.consent09';
import consent10 from '@salesforce/label/c.consent10';
import consent11 from '@salesforce/label/c.consent11';
import consent12 from '@salesforce/label/c.consent12';
import consent13 from '@salesforce/label/c.consent13';
import consent14 from '@salesforce/label/c.consent14';
import consent15 from '@salesforce/label/c.consent15';
import consent16 from '@salesforce/label/c.consent16';
import consent17 from '@salesforce/label/c.consent17';
import consent18 from '@salesforce/label/c.consent18';
import consent19 from '@salesforce/label/c.consent19';
import consent20 from '@salesforce/label/c.consent20';
import consent21 from '@salesforce/label/c.consent21';
import consent22 from '@salesforce/label/c.consent22';
import consent23 from '@salesforce/label/c.consent23';
import consent24 from '@salesforce/label/c.consent24';
import consent25 from '@salesforce/label/c.consent25';
import consent26 from '@salesforce/label/c.consent26';
import consent27 from '@salesforce/label/c.consent27';
import consent28 from '@salesforce/label/c.consent28';
import consent29 from '@salesforce/label/c.consent29';
import consent30 from '@salesforce/label/c.consent30';
import consent31 from '@salesforce/label/c.consent31';
import consent32 from '@salesforce/label/c.consent32';
import consent33 from '@salesforce/label/c.consent33';
import community_name from '@salesforce/label/c.community_name';
import pdf from '@salesforce/resourceUrl/ConsentForTestTaker';
import Community_Url from '@salesforce/label/c.Community_Url';
import Community_language_Url from '@salesforce/label/c.Community_language_Url';
import { CurrentPageReference } from 'lightning/navigation';
import url_aboutyourbrain from '@salesforce/label/c.url_aboutyourbrain';


export default class Consent extends NavigationMixin(LightningElement) {

    urlStateParameters = null;
    currentPageReference;
    
    @track valueConsent = '';
    renderedCallback(){
        if(document.getElementsByTagName("html")[0].getAttribute("lang")=='en-US'){
            this.valueConsent = 'en_US';
        }
        else if(document.getElementsByTagName("html")[0].getAttribute("lang")=='es'){
            this.valueConsent = 'es';
        }
    }
    
    @track termAndCOndition = false;
    @track isModalOpen = false;
    @track ErrorModalOpen = false;
    tempLang;

    label = {
        consent_text_1,
        consent_text_2,
        consent_text_3,
        consent_text_4,
        consent_text_5,
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
				consent01,
				consent02,
				consent03,
				consent04,
				consent05,
				consent06,
				consent07,
				consent08,
				consent09,
				consent10,
				consent11,
				consent12,
				consent13,
				consent14,
				consent15,
				consent16,
				consent17,
				consent18,
				consent19,
				consent20,
				consent21,
				consent22,
				consent23,
				consent24,
				consent25,
				consent26,
				consent27,
				consent28,
				consent29,
				consent30,
				consent31,
				consent32,
				consent33
    }



    connectedCallback() {
        //var print = document.getElementsByClassName('print');
       // window.print();
        
        setTimeout (function(){
            window.print();
        }, 2000);
    }
}