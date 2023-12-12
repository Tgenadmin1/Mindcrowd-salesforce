import { LightningElement, track, wire, api } from 'lwc';
import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import conMainObject from '@salesforce/schema/Contact';
import conBiologicalSex from '@salesforce/schema/Contact.Sex__c';
import conGender from '@salesforce/schema/Contact.Gender__c';
import conEducation from '@salesforce/schema/Contact.Highest_level_of_education_completed__c';
import conSpeakLanguages from '@salesforce/schema/Contact.Number_of_fluent_languages_spoken__c';
import conWriteLanguages from '@salesforce/schema/Contact.Number_of_fluent_languages_written__c';
import conFirstSpeakLanguage from '@salesforce/schema/Contact.First_spoken_language__c';
import conFluentLanguage from '@salesforce/schema/Contact.Most_fluent_language__c';
import Language from '@salesforce/schema/Contact.Language__c';
import conLivingCountry from '@salesforce/schema/Contact.MailingCountryCode';
import conLivingCity from '@salesforce/schema/Contact.MailingCity';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import createContact from '@salesforce/apex/ContactController.saveContactRecord';
import { CurrentPageReference } from 'lightning/navigation';

import step_1 from '@salesforce/label/c.step_1';
import step_2 from '@salesforce/label/c.step_2';
import step_3 from '@salesforce/label/c.step_3';
import step_4 from '@salesforce/label/c.step_4';
import step_4a from '@salesforce/label/c.step_4a';

import brainInfo_text_1 from '@salesforce/label/c.brainInfo_text_1';
import brainInfo_text_2 from '@salesforce/label/c.brainInfo_text_2';
import brainInfo_text_3 from '@salesforce/label/c.brainInfo_text_3';
import brainInfo_text_4 from '@salesforce/label/c.brainInfo_text_4';
import brainInfo_text_5 from '@salesforce/label/c.brainInfo_text_5';
import brainInfo_text_6 from '@salesforce/label/c.brainInfo_text_6';
import brainInfo_text_7 from '@salesforce/label/c.brainInfo_text_7';
import brainInfo_text_8 from '@salesforce/label/c.brainInfo_text_8';
import brainInfo_text_9 from '@salesforce/label/c.brainInfo_text_9';
import brainInfo_text_10 from '@salesforce/label/c.brainInfo_text_10';
import brainInfo_text_11 from '@salesforce/label/c.brainInfo_text_11';
import brainInfo_text_12 from '@salesforce/label/c.brainInfo_text_12';
import brainInfo_text_13 from '@salesforce/label/c.brainInfo_text_13';
import brainInfo_text_14 from '@salesforce/label/c.brainInfo_text_14';
import brainInfo_text_required from '@salesforce/label/c.brainInfo_text_required';
import brainInfo_text_choose from '@salesforce/label/c.brainInfo_text_choose';

import next_button_text from '@salesforce/label/c.next_button_text';
import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';
import 	url_attentiontest from '@salesforce/label/c.url_attentiontest';
import 	url_testlanguage from '@salesforce/label/c.url_testlanguage';
import 	url_attentiontest_page1 from '@salesforce/label/c.url_attentiontest_page1';
import 	url_memorytest_page_1 from '@salesforce/label/c.url_memorytest_page_1';


export default class BrainDesignTest extends LightningElement {
    label = {
        step_1,
        step_2,
        step_3,
        step_4a,
        step_4,
        brainInfo_text_1,
        brainInfo_text_2,
        brainInfo_text_3,
        brainInfo_text_4,
        brainInfo_text_5,
        brainInfo_text_6,
        brainInfo_text_7,
        brainInfo_text_8,
        brainInfo_text_9,
        brainInfo_text_10,
        brainInfo_text_11,
        brainInfo_text_12,
        brainInfo_text_13,
        next_button_text,
        brainInfo_text_14,
        brainInfo_text_required,
        brainInfo_text_choose

    }
    speakingLanguageAgeFind=false;
    zipCodeFind=false;
    bZipcode=false;
    bSex=false;
    bAge=false;
    bEducation=false;
    requiredField1="";
    requiredField2="";
    requiredField3="";
    requiredField4="";
    studyId = null;
    campaignCode="";
    eventCode="";
   
    currentPageReference = null;
    language = null;
    consent = null;
    currentPageReference = null;
    urlStateParameters = null;
    urlId = null;
    valueConsent;
    termAndCOndition;
    isSecondLanguageAgeVisible = false;
    isStateVisible = false;
    @track rec = conMainObject;
    @track opacity = false;
    @track controllingValues = [];
    @track dependentValues = [];
    @track selectedCountry;
    @track selectedState;
    @track isEmpty = false;
    @track error;
    @track ErrorModalOpen = false;
    @track ErrorModalOpenAge = false;
    @track ErrorModalZipCode = false;
    controlValues;
    totalDependentValues = [];
    selectedCountry;
    selectedState;
    controlValues;
    totalDependentValues = [];
    @track removeValue = '&quot;';
    @api step_1 ='About You';
    @api step_2 ='ATTENTION TEST';
    @api step_3 ='MEMORY TEST';
    @api step_4 ='Your Results';
    @api step_4a = 'Your Brain';
    @api brainInfo_text_1 = 'Tell us a little about your brain';
    @api brainInfo_text_2 = 'What is your biological sex?';
    @api brainInfo_text_3 = 'What is your current age?';
    @api brainInfo_text_4 = 'What gender do you identify as?';
    @api brainInfo_text_14 = 'Please tell us what gender you identify as';
    @api brainInfo_text_5 ='What is the highest level of education you have ve completed?';
    @api brainInfo_text_6 = 'How many languages do you speak fluently?';
    @api brainInfo_text_7 = 'How many languages do you write fluently?';
    @api brainInfo_text_8 = 'What was the first language you spoke?';
    @api brainInfo_text_9 = 'If you speak a second language, at what age did you begin speaking that language?';
    @api brainInfo_text_10 = 'In what language are you most fluent?';
    @api brainInfo_text_11 = 'What country do you live in?';
    @api showImage =false;
    @api imgUrl ='';
    @api strTitle='';
    
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {




            this.language = localStorage.getItem('language');
            this.consent = localStorage.getItem('consent');
            
            if(this.getCookie('cmpgn_tg') !=''){
                this.campaignCode = this.getCookie('cmpgn_tg');
            }else{
                this.campaignCode = localStorage.getItem('campaigncode');
            }
            
            // this.eventCode = this.getCookie('eventId');
            this.eventCode = localStorage.getItem('eventId');
            if(this.eventCode!=null && this.eventCode!= undefined){
                this.eventCode = JSON.parse(atob(this.eventCode));
            }
        
            if(localStorage.getItem('studiesId')!=null){
                this.studyId =atob(localStorage.getItem('studiesId'));
            }
           
            
        }
        else {
            //console.log('I am having wrong pagereference.');
        }
        this.preventLeaving() ; 
        if(!window.location.toString().includes("live-preview")){
        if(localStorage.getItem('consent') != "true"){
            // console.log('document.cookie123 = ', this.getCookie('LastPage'));
            window.location.href = Community_Url + "/s/" + url_testlanguage;
         }else{
             this.opacity = true;
            // document.cookie="LastPage="+document.URL+"/";
             localStorage.setItem('LastPage', document.URL)
             
         }
        }

    };

    getCookie (name) {
        var cookieString = "; " + document.cookie;
        cookieString = cookieString.replace('LSKey-c$','');
        var parts = cookieString.split("; " + name + "=");
       
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    }

    @wire(getObjectInfo, { objectApiName: conMainObject }) contactInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: conBiologicalSex
    }) biologicalSex;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: conEducation
    }) education;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: conGender
    }) gender;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: conSpeakLanguages
    }) speakLanguages;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: conWriteLanguages
    }) writeLanguages;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: conFirstSpeakLanguage
    }) firstLanguage;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: conFluentLanguage
    }) fluentLanguage;
    
    @wire(getPicklistValuesByRecordType, { objectApiName: conMainObject, recordTypeId: '$contactInfo.data.defaultRecordTypeId' })
    countryPicklistValues({ error, data }) {      
        if (data) {            
            this.error = null;
            let countyOptions = [{ label: 'United States', value: 'US' }];
            // Account Country Control Field Picklist values
            data.picklistFieldValues.MailingCountryCode.values.forEach(key => {
                countyOptions.push({
                    label: key.label,
                    value: key.value
                })
            });

            this.controllingValues = countyOptions;
            
            let stateOptions = [{ label: '--None--', value: '--None--' }];

            // contact State Control Field Picklist values
            this.controlValues = data.picklistFieldValues.MailingStateCode.controllerValues;
            // contact State dependent Field Picklist values
            this.totalDependentValues = data.picklistFieldValues.MailingStateCode.values;

            this.totalDependentValues.forEach(key => {
                stateOptions.push({
                    label: key.label,
                    value: key.value
                })
            });

            this.dependentValues = stateOptions;
           // console.log('----state list is as follows---', this.dependentValues);
        }
        else if (error) {
            this.error = JSON.stringify(error);
           // console.log(this.error);
        }
    }
    handleCountryChange(event) {
        // Selected Country Value
        this.selectedCountry = event.target.value;
        this.isEmpty = false;
        let dependValues = [];

        if (this.selectedCountry) {
            // if Selected country is none returns nothing
            if (this.selectedCountry === '--None--') {
                this.isEmpty = true;
                dependValues = [{ label: '--None--', value: '--None--' }];
                this.selectedCountry = null;
                this.selectedState = null;
                return;
            }
            else if (this.selectedCountry == 'US') {
                this.isStateVisible = true;
            }
            else if(this.selectedCountry != 'US') {
                this.isStateVisible = false;
               
            }
            // filter the total dependent values based on selected country value 
            this.totalDependentValues.forEach(conValues => {
                if (conValues.validFor[0] === this.controlValues[this.selectedCountry]) {
                    dependValues.push({
                        label: conValues.label,
                        value: conValues.value
                    })
                }
            })
            this.dependentValues = dependValues;
            //console.log('country selected is', this.selectedCountry);
        }
    }
    // handleStateChange(event) {
    //     this.rec.MailingStateCode = event.target.value;
    // }
    handleBiologicalSex(event) {
        this.rec.Sex__c = event.target.value;
    }
    handleAge(event) {
        this.rec.Age__c = event.target.value;
        let age = this.template.querySelector('.age');
        let value2 = this.rec.Age__c;
        if (!/^[0-9]+$/.test(value2)) {
            age.value="";
            age.setCustomValidity("");
        } else {
            age.setCustomValidity("");
        }
        age.reportValidity();
    }
    handleGender(event) {
        this.rec.Gender__c = event.target.value;
    }
    handleChangeFieldeducation(event) {
        this.rec.Highest_level_of_education_completed__c = event.target.value;
    }
    handleChangeFieldspeakLanguages(event) {
     
        this.rec.Number_of_fluent_languages_spoken__c = event.target.value;
        if(this.rec.Number_of_fluent_languages_spoken__c > 1){
         
            this.isSecondLanguageAgeVisible = true;
           
        }
        else{
            this.isSecondLanguageAgeVisible = false;
            this.rec.Age_at_second_spoken_language__c='';
           
        }
    };

    handleChangeFieldwriteLanguages(event) {
        this.rec.Number_of_fluent_languages_written__c = event.target.value;
    };

    handleChangeFieldfirstLanguage(event) {
        this.rec.First_spoken_language__c = event.target.value;
    };

    handleChangeFieldfluentLanguage(event) {
        this.rec.Most_fluent_language__c = event.target.value;
    };

    handleChangeFieldspeakingLanguageAge(event) {
        this.rec.Age_at_second_spoken_language__c = event.target.value;
        let speakingLanguageAge = this.template.querySelector('.speakingLanguageAge');
        let ageAtSecondSpokenLanguage = this.rec.Age_at_second_spoken_language__c;
        if (!/^[0-9]+$/.test(ageAtSecondSpokenLanguage)) {
            speakingLanguageAge.value="";
            speakingLanguageAge.setCustomValidity("");
        }
        else {
            speakingLanguageAge.setCustomValidity("");
        }        
    };

    handleCity(event) {
        this.rec.MailingPostalCode = event.target.value;
        let zipcode = this.template.querySelector('.zipcode');
        let value4 = this.rec.MailingPostalCode;
        if (this.isStateVisible==true  &&  !/^[0-9]+$/.test(value4)) {
            zipcode.value="";
            this.rec.MailingPostalCode="";
            this.bZipcode=true;
            zipcode.setCustomValidity("");
        } 
        else {
            zipcode.setCustomValidity("");           
        }
    };

    get renderOptionalField() {
        return this.rec.Gender__c === 'Not Listed' ? true : false;
    };

    handleOtherGender(event){
        this.rec.Other_Gender__c = event.target.value;
    };

    //=========On click create contact and start game with Calling Apex class=============//
    startGame(event) 
    {        
        //===========Custom Validation Start==============
        let biologicalSex = this.template.querySelector('.biologicalSex');
        let value1 = this.rec.Sex__c;
        if (value1 == '' || value1 == null) {
            this.bSex=true; 
            biologicalSex.setCustomValidity('hhhh');  
            this.requiredField1="Please select the Biological Sex.";
        } 
        else {
            this.bSex=false; 
            this.requiredField1="";
            biologicalSex.setCustomValidity("");
        }
        biologicalSex.reportValidity();

        let age = this.template.querySelector('.age');
        let value7 =  this.rec.Age__c;
        if (value7 == '' || value7 == null || (value7 < 0 || value7 >115)) {        
            this.bAge=true;           
            age.setCustomValidity("hhhh");
            this.requiredField2="Please indicate your Age(Enter Only Numeric Characters).";
        }
        else {
            this.bAge=false;
            this.requiredField2="";
            age.setCustomValidity("");
        }
        age.reportValidity();

        let education = this.template.querySelector('.education');
        let value3 = this.rec.Highest_level_of_education_completed__c;
        if (value3 == '' || value3 == null) {
            this.bEducation=true;
            education.setCustomValidity('hhhh');
            this.requiredField3="Please select the highest level of education you’ve completed.";
        } 
        else {
            this.bEducation=false;
            this.requiredField3="";
            education.setCustomValidity("");
        }
        education.reportValidity();
        //===========Custom Validation Start==============


        this.speakingLanguageAgeFind=false;
        let valuez = this.rec.Age_at_second_spoken_language__c;
        if((valuez >= 0 && valuez <=115) || valuez==undefined){
            this.speakingLanguageAgeFind=true;
        }

        const isInputsCorrect = [...this.template.querySelectorAll('.require')].reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
        }, true);

        if (isInputsCorrect && this.speakingLanguageAgeFind==true) {      
            this.rec.LastName = "Anonymous User";
            this.rec.Participation_Type__c = "Catchment";
            this.rec.Campaign_Code__c = this.campaignCode;
            this.rec.Event_Id__c = this.eventCode;
            
            if(this.language=='en_US'){
                this.rec.Language__c = 'English';
            }
            if(this.language=='es'){
                this.rec.Language__c = 'Español';
            }
           
            this.rec.MailingCountryCode=this.selectedCountry;
            this.rec.Consent_Catchment__c = this.consent;
            if(this.studyId){
                this.rec.Study_Id__c = JSON.parse(this.studyId);
            }
            event.target.disabled = true;
            //call Apex action to create contact with default name as Anonymous 
            createContact({ con: this.rec })
            .then(result => {
                
                //remove campaigncode, studiesId and eventId after contact record created
                //document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'cmpgn_tg =';
                localStorage.removeItem('campaigncode');
                localStorage.removeItem('eventId');
                localStorage.removeItem('studiesId');

                let data = JSON.parse(JSON.stringify(result));
                localStorage.setItem('c__id', btoa(data.conId));
                if(data.gameId){
                    localStorage.setItem('pGameId', btoa(data.gameId));
                }
                localStorage.setItem('pGameInfoCreated', btoa(data.pgiId));
                localStorage.setItem('catchmentGamePage', document.URL);
                document.cookie = 'catchmentGamePage=' + document.URL;
                this.message = result;
                this.error = undefined;
                if ("ontouchstart" in document.documentElement){                        
                    localStorage.setItem('macTouch', true)
                }
                else{                        
                    localStorage.setItem('macTouch', false)
                }
                this.allowLeaving();
                window.location = Community_Url + "/s/"+url_attentiontest_page1;
            })
            .catch(error => {
                event.target.disabled = false;
                this.message = undefined + 'symnole';
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record...',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                window.console.log("error", JSON.stringify(this.error));
            });
            this.zipCodeFind=false;
        }
        else {            
            if(this.rec.Age__c<0 || this.rec.Age__c>115 || this.rec.Age_at_second_spoken_language__c<0 || 
                this.rec.Age_at_second_spoken_language__c>115)
            { 
                this.ErrorModalOpenAge = true;
                this.ErrorModalOpen = false;
                this.ErrorModalZipCode = false;
                document.querySelector("body").style.overflow = 'visible';                
            }
            else{
                this.ErrorModalOpenAge = false;
                this.ErrorModalZipCode = false;
                this.ErrorModalOpen = true;
                document.querySelector("body").style.overflow = 'visible';
            }
        }
    };

    closeModal() {
        //this.isModalOpen = false;
        this.ErrorModalOpen = false;
          
    }
    closeModalAge() {
        //this.isModalOpen = false;
        this.ErrorModalOpenAge = false;
          
    }
    closeModalZipCode(){
        this.ErrorModalZipCode = false;
    }
    
    leaveHandler(event) {
        event.returnValue = "Are you sure you want to leave? All changes will be lost!";
    }
    preventLeaving() {
        window.addEventListener("beforeunload", this.leaveHandler);
    }
    allowLeaving() {
        window.removeEventListener("beforeunload", this.leaveHandler);
    }
}