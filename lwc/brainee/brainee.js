//  Created By: {Girikon(Shweta Khunteta)}
// Created On: 28/05/2021
// Description/Purpose: Why and where it is used [TM-31]- A form created to save the values from 
//brainee (LWC component) to Contact Object 
// This form is exposed to community and for guest users.


import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_REPEAT from '@salesforce/schema/Contact.Repeat_test_taker__c';
import CONTACT_HISPANIC from '@salesforce/schema/Contact.Hispanic_Latino__c';
import CONTACT_HANDEDNESS from '@salesforce/schema/Contact.Are_you_Left_or_Right_hand_dominant__c';
import CONTACT_RACE from '@salesforce/schema/Contact.Race__c';
import CONTACT_HISPANICORIGIN from '@salesforce/schema/Contact.Hispanic_Latino_origin__c';
import CONTACT_MEDICATIONS from '@salesforce/schema/Contact.Number_of_daily_medications__c';
import CONTACT_FIRSTDEGREE from '@salesforce/schema/Contact.First_degree_family_history_of_AD__c';
import CONTACT_HEALTH from '@salesforce/schema/Contact.Health_Lifestyle_and_Medical__c';
import CONTACT_FIRSTDEGREE_EO from '@salesforce/schema/Contact.First_degree_family_history_of_EO_AD__c';
import CONTACT_SECONDDEGREE from '@salesforce/schema/Contact.Second_degree_family_history_of_AD__c';
import upsertContact from '@salesforce/apex/ContactController.upsertContact';
import Community_Url from '@salesforce/label/c.Community_Url';
import url_emailrequestvipinvite from '@salesforce/label/c.url_emailrequestvipinvite';
import consent_URL from '@salesforce/label/c.url_testlanguage';
import url_aboutyourbrain from '@salesforce/label/c.url_aboutyourbrain';
import url_memorytestcompleted from '@salesforce/label/c.url_memorytestcompleted';
import url_additionalquestions from '@salesforce/label/c.url_additionalquestions';

export default class Brainee extends NavigationMixin(LightningElement) {
    @api completepageq1="Have you taken the Mindcrowd test before?";
    @api campylete2="Are you left or right hand dominant?";
    @api complete3="Which option best describes your race?";
    @api Hispanic_Latino="Do you consider yourself Hispanic or Latino?";
    @api complete4_a="Would you like to share your family’s origin with us? (check as many as apply)";
    @api complete5="How many prescription medications do you take on a daily basis?";
    @api complete6="Which of the following have you personally experienced or are you currently experiencing?";
    @api complete7="Has one of your siblings or one of your parents been diagnosed with Alzheimer’s disease?";
    @api complete8="Was your sibling or parent diagnosed with Alzheimer's disease before the age of 55?";
    @api complete9="Do you have any second-degree relatives (grandparents, grandchildren, aunts, uncles, nephews, nieces, or half-siblings) that have been diagnosed with Alzheimer’s disease?";
    @api step_1 = 'About You';
    @api step_2 = 'ATTENTION TEST';
    @api step_3 = 'MEMORY TEST';
    @api step_4 = 'YOUR RESULTS';
    @api step_4a = 'Your Brain';
    @api Brain_Info_Results="View Your Results";
    @api brainInfo_text_choose="Please Choose";
    @api brainee_1="LET'S COMPARE YOUR BRAIN!";
    @api brainee_2="These additional details will help compare your results to other people like you.";
    @api strTitle="Welcome in Salesforce";
    //@track rec = CONTACT_OBJECT;
    currentPageReference = null;
    urlStateParameters = null;
    urlId = null;
    contactId = null;
    input_handedness;
    input_race;
    input_hispanic='';
    input_hispanicorigin;
    input_medications;
    input_health;
    input_healthCheck;
    input_firstdegree;
    input_firstdegreeeo;
    input_seconddegree;
    isFirstDegreeEOVisible = false;
    // @track hispanicLatinoValueSet='NA';
    @track hispanicLatinoValueSet;
    @track opacity = false;
    @track hispanicCountry = false;
    @track selectedCountry = [];
    @track selectedmedicalConditions = [];


    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {

        this.preventLeaving();

        
         // redirecting the page if user tried to change the URL.
         if(!window.location.toString().includes("live-preview")){
         if(localStorage.getItem('consent') != "true"){
            window.location = Community_Url + "/s/" + consent_URL;
        }else if((localStorage.getItem('c__id') == '' || localStorage.getItem('c__id') ==undefined) && localStorage.getItem('consent') == "true"){
            //console.log('cookies: ',document.cookie);
            window.location = Community_Url + "/s/" + url_aboutyourbrain;
        }else{
           // alert(this.getCookie('LastPage'));
            let lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
            console.log('lastBrain: ',lastBrain);
           // alert(lastBrain);
            if(lastBrain!=url_memorytestcompleted && lastBrain!=url_additionalquestions) {    
                window.location = localStorage.getItem('LastPage');
            }else{
                this.opacity = true;
                // document.cookie="LastPage="+document.URL+";path=/";
                localStorage.setItem('LastPage', document.URL);
                if (currentPageReference) {
                    this.urlId =localStorage.getItem('c__id');
                    if (this.urlId != null){
                        this.contactId = atob(this.urlId);
                    }    
                    else
                        this.contactId = "";
                }
            }
            console.log('cookies: ',document.cookie);
        }  
    }
       
    };
    // getCookie(name) {
    //     var cookieString = "; " + document.cookie;
    //     cookieString = cookieString.replace('LSKey-c$', '');
    //     var parts = cookieString.split("; " + name + "=");
    //     if (parts.length === 2) {
    //         return parts.pop().split(";").shift();
    //     }
    //     return null;
    // }
    get hispanicOptions() {
        return [
            { label: Yes, value: 'true' },
            { label: No, value: 'false' },
        ];
    }
    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT }) contactInfo;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_HISPANICORIGIN
    }) hispanicorigin;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_HISPANIC
    }) HispanicLatinoPicklist;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_REPEAT
    }) repeattesttaker;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_HANDEDNESS
    }) handedness;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_RACE
    }) race;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_MEDICATIONS
    }) medications;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_FIRSTDEGREE
    }) firstdegree;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_FIRSTDEGREE_EO
    }) firstdegreeeo;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_SECONDDEGREE
    }) seconddegree;
    @wire(getPicklistValues, {
        recordTypeId: '$contactInfo.data.defaultRecordTypeId',
        fieldApiName: CONTACT_HEALTH
    }) health;

    handleRepeatTestTaker(event) {
        this.input_repeattestaker = event.target.value;
    }
    handleHandedness(event) {
        this.input_handedness = event.target.value;
    }
    handleRace(event) {  
        this.input_race = event.target.value;
    }
    handleHispanic(event) {
        console.log('here');
        this.hispanicLatinoValueSet = event.target.value;
        console.log('value1',this.hispanicLatinoValueSet);
        console.log('value2',event.target.value);
        if (this.hispanicLatinoValueSet == 'Yes') {
            this.hispanicCountry = true;
        } 
        else{
            this.hispanicCountry = false;
        }
    }
    
    hispanicCountriesChange(event) {
        this.input_hispanicorigin = JSON.parse(JSON.stringify(event.detail.value)).join(';');
    }
    handleMedications(event) {
        this.input_medications = event.target.value;
    }
    handleFirstDegree(event) {
        this.input_firstdegree = event.target.value;
        if (event.target.value === 'Yes') {
            this.isFirstDegreeEOVisible = true;
        } else {
            this.isFirstDegreeEOVisible = false;
        }
    }
    handleFirstDegreeEO(event) {
        this.input_firstdegreeeo = event.target.value;
    }
    handleSecondDegree(event) {
        this.input_seconddegree = event.target.value;
    }
    medicalConditionsChange(event) {
        
        //console.log('hint-----ttttttttt-----',event.detail.value[event.detail.value.length - 1], 'event.detail.value.length = ', event.detail.value.length);
        this.input_health = (event.detail.value);
        console.log('Checking'+this.input_health);
        if(this.input_health==''){
            this.selectedmedicalConditions = this.input_health;
        }
        // this.input_health = JSON.parse(JSON.stringify(event.detail.value)).join(';');
         for(let i=0;i<event.detail.value.length;i++){  
            if(this.input_health[i]=="None of these Conditions Apply to Me"){
                this.selectedmedicalConditions=this.input_health[i];
                this.input_health = this.selectedmedicalConditions;
                
            }
            else if(this.input_health.length == 2 &&  this.input_health[this.input_health.length-1] == "None of these Conditions Apply to Me"){
                //console.log('Check ==length== =',this.input_health,this.selectedmedicalConditions,this.input_health[i]);
                if(this.selectedmedicalConditions!="None of these Conditions Apply to Me" ){
                    this.selectedmedicalConditions="None of these Conditions Apply to Me";
                    this.input_health = this.selectedmedicalConditions;
                }
                
                else{
                    this.selectedmedicalConditions=this.input_health[i];
                    this.input_health = this.selectedmedicalConditions;
                }
            }
         }
         this.input_health = JSON.parse(JSON.stringify(this.input_health)).join(';');
    }
   
    updateContact() {
        this.input_hispanic=this.hispanicLatinoValueSet;
        //console.log('hispanic:',this.input_hispanic);
        upsertContact({
            contactId: this.contactId,
            repeattesttaker: this.input_repeattestaker,
            handedness: this.input_handedness,
            race: this.input_race,
            hispanic: this.input_hispanic,
            hispanicorigin: this.input_hispanicorigin,
            medications: this.input_medications,
            health: this.input_health,
            urlId: this.urlId,
            firstdegree: this.input_firstdegree,
            firstdegreeeo: this.input_firstdegreeeo,
            seconddegree: this.input_seconddegree
        }).then(result => {
                if (result) {
                   // this.fireSuccessToast();
                    console.log('fields updated', result);
                    // window.location.replace(Community_Url + "/s/finish" + '?' + 'id=' + btoa(JSON.stringify(this.contactId)));
                    this.allowLeaving();
                   // window.location.replace(Community_Url + "/s/"+ url_emailrequestvipinvite);
                    window.location = Community_Url + "/s/"+url_emailrequestvipinvite;

                } else {
                    console.log('Fields NOT updated', result);
                }
            })
            .catch(error => {
                console.log('error: ', error);
            });
    }
    fireSuccessToast() {
        const evt = new ShowToastEvent({
            message: 'You just submitted your details!',
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
    leaveHandler(event) {
        event.returnValue = "Are you sure you want to leave? All changes will be lost!";
    }
    preventLeaving() {
        window.addEventListener("beforeunload", this.leaveHandler);
       // alert('test');
    }
    allowLeaving() {
        window.removeEventListener("beforeunload", this.leaveHandler);
    }
    

   


}