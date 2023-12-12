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


import next_button_text from '@salesforce/label/c.next_button_text';
import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';
import 	url_attentiontest from '@salesforce/label/c.url_attentiontest';
import 	url_consent from '@salesforce/label/c.url_consent';
import 	url_attentiontest_page1 from '@salesforce/label/c.url_attentiontest_page1';
import 	url_aboutyourbrain from '@salesforce/label/c.url_aboutyourbrain';
import close_btn from "@salesforce/label/c.close_btn";
//import { publish,createMessageContext,releaseMessageContext, subscribe, unsubscribe } from 'lightning/messageService';
//import lmsDemoMC from "@salesforce/messageChannel/LMSDemoWin__c";

import update_AB_Testing_Record from '@salesforce/apex/ContactController.updateABTestingRecord';



export default class BrainInfo extends NavigationMixin(LightningElement) {
    
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
        close_btn

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
    subIdToContact="";
   
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

    @api step_1 = 'About You';
    @api step_2 = 'ATTENTION TEST';
    @api step_3 = 'MEMORY TEST';
    @api step_4 = 'YOUR RESULTS';
    @api step_4a = 'Your Brain';
    @api brainInfo_text_1 = 'Tell us a little about your brain';
    @api brainInfo_text_2 = 'What is your biological sex?';
    @api brainInfo_text_3 = 'What is your current age?';
    @api brainInfo_text_4 = 'What gender do you identify as?';
    @api brainInfo_text_5 = "What is the highest level of education you've completed?";
    @api brainInfo_text_6 = 'How many languages do you speak fluently?';
    @api brainInfo_text_7 = 'How many languages do you write fluently?';
    @api brainInfo_text_8 = 'What was the first language you spoke?';
    @api brainInfo_text_9 = 'If you speak a second language, at what age did you begin speaking that language?';
    @api brainInfo_text_10 = 'In what language are you most fluent?';
    @api brainInfo_text_11 = 'What country do you live in?';
    @api brainInfo_text_13 = 'What zip code do you currently live in?';
    @api brainInfo_text_14 = 'Please tell us what gender you identify as';
    @api brainInfo_text_choose = 'Please Choose';
    @api next_button_text = 'Continue';
    @api brainInfo_text_required = 'Required Field';
    @api brainInfo_text_error = "Please fill out the fields marked with an asterisk.";
    @api brainInfo_error_age = "Please enter age from 18 to 115.";
    @api strTitle = 'Welcome in Salesforce';
    



    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.language = localStorage.getItem('language');
            this.consent = localStorage.getItem('consent');
            // if(this.getCookieByName('cmpgn_tg') !='' && this.getCookieByName('cmpgn_tg') !=null){
              //  console.log('campaignCode123 = ', localStorage.getItem('campaigncode'));
               // console.log('campaignCode = ', localStorage.getItem('campaigncode').substring(0, 20));
               // console.log('cmpgn_tg = ', this.getCookieByName('cmpgn_tg'));
            // if(cmpgn_tg !='' && cmpgn_tg !=null){
            //     this.campaignCode = cmpgn_tg;
            //     console.log('cmpgn_tg = ', cmpgn_tg);
            // }else{
            //     if(localStorage.getItem('campaigncode') !='' && localStorage.getItem('campaigncode') !=null){
            //         this.campaignCode = localStorage.getItem('campaigncode').substring(0, 20);
            //         console.log('campaignCode = ', this.campaignCode);
            //     }
            // }
            var tempCampCode =  localStorage.getItem('campaigncode');
            console.log('subid==>',localStorage.getItem('subIdToStoreLocal'));
            if(tempCampCode !='' && tempCampCode){
               // console.log('campaignCode124 = ', localStorage.getItem('campaigncode'));
                this.campaignCode = tempCampCode;
                console.log('campaignCode = ', this.campaignCode);
            }
            
            //this.messageChannelSubscription = subscribe(
                //this.messageContext,
                //messageChannel,
                //(message) => this.handleMessage(message));
                
            // this.eventCode = this.getCookie('eventId');
            this.eventCode = localStorage.getItem('eventId');
            if(this.eventCode!=null && this.eventCode!= undefined){
                this.eventCode = JSON.parse(atob(this.eventCode));
            }
            
            if(localStorage.getItem('studiesId')!=null){
                this.studyId =atob(localStorage.getItem('studiesId'));
            }
            if(localStorage.getItem('subIdToStoreLocal')!=null){
                this.subIdToContact =localStorage.getItem('subIdToStoreLocal');
            }

          // console.log('subId = ', localStorage.getItem('subIdToStoreLocal'));
            
        }
        else {
            //console.log('I am having wrong pagereference.');
        }
        this.preventLeaving() ; 
        this.dispatchEvent( 
            new CustomEvent( 
                'executeHeaderScript', // Event Name
                { bubbles: true, composed : true }
            )
        )
        if(!window.location.toString().includes("live-preview")){
            console.log('lastPage', localStorage.getItem('LastPage'));
            var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
            
            
        if(localStorage.getItem('consent') != "true"){
            window.location.href = Community_Url + "/s/" + url_consent;
            
         }else if(lastBrain != url_consent && lastBrain != url_aboutyourbrain){
            window.location.href =  localStorage.getItem('LastPage');
         }else{
             this.opacity = true;
             //localStorage.setItem('LastPage', document.URL)
             localStorage.setItem('LastPage', Community_Url + window.location.pathname);
             
         }
        }

    };

    // getCookie (name) {
	// 	var cookieString = "; " + document.cookie;
    //     if(cookieString.includes('LSKey-c$')){
    //        var parts = cookieString.split("; LSKey-c$" + name + "=");
    //     }else{
    //        var parts = cookieString.split("; " + name + "=");
    //     }
    //      if (parts.length === 2) {
    //          return parts.pop().split(";").shift();
    //      }
    //      return null;
    // }

    

     getCookieByName(cookie_name){
        // Construct a RegExp object as to include the variable name
        const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
        try{
          return document.cookie.match(re)[0];    // Will raise TypeError if cookie is not found
        }catch{
          return "this-cookie-doesn't-exist";
        }
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
    handleInputAge(event){
        //console.log('inside handleinputage');
        if (event.target.value.length > 3) {
            event.target.value = event.target.value.slice(0,3); 
        }
    }
    handInpSpekLanguage(event){
        //console.log('inside handleinputspeskage');
        if (event.target.value.length > 3) {
            event.target.value = event.target.value.slice(0,3); 
        }
    } 
    handleAge(event) {
        this.rec.Age__c = event.target.value;
        let age = this.template.querySelector('.age');
        let value2 = this.rec.Age__c;
        if (!/^[0-9]+$/.test(value2)) {
            age.value="";
            age.setCustomValidity("");
            this.template.querySelector('[data-recid=agediv').classList.add('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
        } else {
            age.setCustomValidity("");
            this.template.querySelector('[data-recid=agediv').classList.remove('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
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
     //console.log('here');
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
            this.template.querySelector('[data-recid=agespeaklangdiv').classList.add('input-invalid_speaklangage');//Added by Sibi for TSS-22-for field alignment issue
        }
        else {
            speakingLanguageAge.setCustomValidity("");
            this.template.querySelector('[data-recid=agespeaklangdiv').classList.remove('input-invalid_speaklangage');//Added by Sibi for TSS-22-for field alignment issue
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
            this.template.querySelector('[data-recid=agediv').classList.add('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
        }
        else {
            this.bAge=false;
            this.requiredField2="";
            age.setCustomValidity("");
            this.template.querySelector('[data-recid=agediv').classList.remove('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
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
        //console.log([...this.template.querySelectorAll('.require')]);//Sibi
        //console.log('isInputsCorrect: '+isInputsCorrect)//Sibi

        if (isInputsCorrect && this.speakingLanguageAgeFind==true) {      
            this.rec.LastName = "Anonymous User";
            this.rec.Participation_Type__c = "Catchment";
            this.rec.Campaign_Code__c = this.campaignCode;
            this.rec.Event_Id__c = this.eventCode;
            this.rec.Sub_Id__c = this.subIdToContact;
            
            
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
                //document.cookie = 'cmpgn_tg =';
                
                localStorage.removeItem('campaigncode');
                 localStorage.removeItem('eventId');
                 localStorage.removeItem('studiesId');
                 localStorage.removeItem('subIdToStoreLocal');
                 

                let data = JSON.parse(JSON.stringify(result));
                if(data.conId != null){
                    this.updateContactIdInAbTesting(data.conId);
                } 
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
                if((this.rec.Age__c<0 || this.rec.Age__c>115) && (this.rec.Age_at_second_spoken_language__c<0 || 
                    this.rec.Age_at_second_spoken_language__c>115))
                {
                    this.template.querySelector('[data-recid=agespeaklangdiv').classList.add('input-invalid_speaklangage');//Added by Sibi for TSS-22-for field alignment issue
                    this.template.querySelector('[data-recid=agediv').classList.add('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
                }
                else if(this.rec.Age__c<0 || this.rec.Age__c>115)
                {
                    this.template.querySelector('[data-recid=agespeaklangdiv').classList.remove('input-invalid_speaklangage');//Added by Sibi for TSS-22-for field alignment issue
                    this.template.querySelector('[data-recid=agediv').classList.add('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
                }
                else{
                    this.template.querySelector('[data-recid=agespeaklangdiv').classList.add('input-invalid_speaklangage');//Added by Sibi for TSS-22-for field alignment issue
                    this.template.querySelector('[data-recid=agediv').classList.remove('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
                }
            }
            else{
                this.ErrorModalOpenAge = false;
                this.ErrorModalZipCode = false;
                this.ErrorModalOpen = true;
                document.querySelector("body").style.overflow = 'visible';
                if(this.rec.Age__c == null || this.rec.Age__c =='')
                {
                    this.template.querySelector('[data-recid=agediv').classList.add('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
                }
                else
                {
                    this.template.querySelector('[data-recid=agediv').classList.remove('input-invalid');//Added by Sibi for TSS-22-for field alignment issue
                }              

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
    updateContactIdInAbTesting(value){
        let conId=value;
        let abtestrecId=localStorage.getItem('AbTestId') != null ? localStorage.getItem('AbTestId') : null ;
        if(abtestrecId != null){
            update_AB_Testing_Record({recId : abtestrecId, contactId : conId})
            .then(response=>{
                localStorage.removeItem('AbTestId');
                this.error = undefined;         
                })
                .catch(error => {
                this.error = error;
            });
        }
       
    }
        
          
}