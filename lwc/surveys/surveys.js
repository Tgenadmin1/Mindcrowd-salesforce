import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import updateContactFields from "@salesforce/apex/ContactController.updateContactFields";
import getCurrentContact from '@salesforce/apex/CustomLoginController.getCurrentContact';
import restrictExpandedGames from '@salesforce/apex/CustomLoginController.restrictExpandedGames';

import Community_Url_MC_Cloud from '@salesforce/label/c.Community_Url_MC_Cloud';
import url_Health_Medical_Survey from '@salesforce/label/c.url_Health_Medical_Survey';
import url_COVID_Survey from '@salesforce/label/c.url_COVID_Survey';
import url_Brain_Disease_Survey from '@salesforce/label/c.url_Brain_Disease_Survey';
import url_SES_Survey from '@salesforce/label/c.url_SES_Survey';
import url_FHAD_Survey from '@salesforce/label/c.url_FHAD_Survey';
import url_Women_Health_Survey from '@salesforce/label/c.url_Women_Health_Survey';
import url_Subjective_English_Survey from '@salesforce/label/c.url_Subjective_English_Survey';
import url_Sleep_Survey from '@salesforce/label/c.url_Sleep_Survey';
import url_ADL_Survey from '@salesforce/label/c.url_ADL_Survey';
import url_Diet_Survey from '@salesforce/label/c.url_Diet_Survey';
import url_Perceived_Stress_Survey from '@salesforce/label/c.url_Perceived_Stress_Survey';
import url_SWLS_Survey from '@salesforce/label/c.url_SWLS_Survey';
import url_QPAR_Survey from '@salesforce/label/c.url_QPAR_Survey';
import url_Social_Stress_Survey from '@salesforce/label/c.url_Social_Stress_Survey';
import url_Anxiety_Survey from '@salesforce/label/c.url_Anxiety_Survey';
import url_Social_Support_Survey from '@salesforce/label/c.url_Social_Support_Survey';
import url_Cancer_Survey from '@salesforce/label/c.url_Cancer_Survey';


export default class surveys extends NavigationMixin(LightningElement) {
    
    lstcon;

    @api Email;
    @api contactId;
    @api survey_text_1 = "Welcome to your personal survey dashboard";
    @api survey_text_2 = "The tiles below represent short surveys that you can complete. Click a tile to launch the survey";
    @api Survey_text_2_1 = "A survey available to complete. Do these first.";
    @api Survey_text_2_2 = "A survey you have already completed. You can update these again in the future.";
    @api Survey_text_2_3 = "A locked survey. These will unlock as you complete more.";
    @api Survey_text_2_4 = "Note: Not all surveys are optimized to complete easily on a smartphone screen. We recommend using a tablet, laptop, or desktop computer for the surveys on this page.";
    
    @api survey_name_1 = "General Health";
    @api survey_name_2 = "COVID";
    @api survey_name_3 = "History of Brain Disease";
    @api survey_name_4 = "Economic Status";
    @api survey_name_5 = "Family History of Alzheimer's Disease";
    @api survey_name_6 = "Women's Health";
    @api survey_name_7 = "Language";
    @api survey_name_8 = "Sleep";
    @api survey_name_9 = "Daily Activities";
    @api survey_name_10 = "Nutrition";
    @api survey_name_11 = "Perceived Stress";
    @api survey_name_12 = "Life Satisfaction";
    @api survey_name_13 = "Physical Activity";
    @api survey_name_14 = "Stress";
    @api survey_name_15 = "Anxiety";
    @api survey_name_16 = "Social Support";
    @api survey_name_17 = "Cancer";
    @api survey_name_18 = "Coming Soon...";

    @api survey_two_min = "2 min";
    @api survey_three_min = "3 min";
    @api survey_five_min = "5 min";

    @track openGame4 = false;
    @track completeGame4 = false;
    @track lockGame4 = false;

    @track openSurvey1 = false;
    @track completeSurvey1 = false;
    @track lockSurvey1 = false;
    @track openSurvey2 = false;
    @track completeSurvey2 = false;
    @track lockSurvey2 = false;
    @track openSurvey3 = false;
    @track completeSurvey3 = false;
    @track lockSurvey3 = false;
    @track openSurvey4 = false;
    @track completeSurvey4 = false;
    @track lockSurvey4 = false;
    @track openSurvey5 = false;
    @track completeSurvey5 = false;
    @track lockSurvey5 = false;
    @track openSurvey6 = false;
    @track completeSurvey6 = false;
    @track lockSurvey6 = false;
    @track openSurvey7 = false;
    @track completeSurvey7 = false;
    @track lockSurvey7 = false;
    @track openSurvey8 = false;
    @track completeSurvey8 = false;
    @track lockSurvey8 = false;
    @track openSurvey9 = false;
    @track completeSurvey9 = false;
    @track lockSurvey9 = false;
    @track openSurvey10 = false;
    @track completeSurvey10 = false;
    @track lockSurvey10 = false;
    @track openSurvey11 = false;
    @track completeSurvey11 = false;
    @track lockSurvey11 = false;
    @track openSurvey12= false;
    @track completeSurvey12 = false;
    @track lockSurvey12 = false;
    @track openSurvey13 = false;
    @track completeSurvey13 = false;
    @track lockSurvey13 = false;
    @track openSurvey14 = false;
    @track completeSurvey14 = false;
    @track lockSurvey14 = false;
    @track openSurvey15 = false;
    @track completeSurvey15 = false;
    @track lockSurvey15 = false;
    @track openSurvey16 = false;
    @track completeSurvey16 = false;
    @track lockSurvey16 = false;
    @track openSurvey17 = false;
    @track completeSurvey17 = false;
    @track lockSurvey17 = false;
    @track hasMouse = false;
    @track macTouch = false;
    @track restrictGame = false;



    @api url_HealthMedicalSurvey = '';
    @api url_COVIDSurvey = '';
    @api url_BrainDiseaseSurvey = '';
    @api url_SESSurvey = '';
    @api url_FHADSurvey = '';
    @api url_WomenHealthSurvey = '';
    @api url_SubjectiveEnglishSurvey = '';
    @api url_SleepSurvey = '';
    @api url_ADLSurvey = '';
    @api url_DietSurvey = '';
    @api url_PerceivedStressSurvey = '';
    @api url_SWLSSurvey = '';
    @api url_QPARSurvey = '';
    @api url_SocialStressSurvey = '';
    @api url_AnxietySurvey = '';
    @api url_SocialSupportSurvey = '';
    @api url_CancerSurvey = '';



   /* @track dynamicFontSize; 

    connectedCallback() {
        this.calculateFontSize();
    }

    calculateFontSize() {
        const textLength = this.survey_text_5.length;
        const baseFontSize = 46; // Your original base font size
        const maxTextLength = 30; // Adjust this based on your design

        let fontSize = baseFontSize;

        if (textLength > maxTextLength) {
            fontSize = baseFontSize - (textLength - maxTextLength);
        }

        this.titleStyle = `font-size: ${fontSize}px`;
    } */

    connectedCallback() {
        getCurrentContact()
            .then(result => {
                console.log('inside conn call back');

               // alert('scree width = ' + screen.width + ' document width = ' + document.width);
               // alert('scroll = ' + document.documentElement.scrollHeight + ' document height = ' + window.innerHeight);
                if(this.getCookie('macTouch') == 'true'){
                    this.macTouch = true;
                    console.log('macTouch1 =' + this.macTouch );
                }else{
                    this.macTouch = false;
                    console.log('macTouch2 =' + this.macTouch );
                }

                this.lstcon = result;
                console.log('result', this.lstcon);
                this.error = undefined;
                console.log('lstcon'+ this.lstcon);

                
                if (this.lstcon.HEALTH_MEDICAL__c == "Opened" || this.lstcon.HEALTH_MEDICAL__c == null) {
                    //this.template.querySelector('.survey1').className = 'opened game-tiles survey1';
                    this.openSurvey1 = true;
                    console.log('HEALTH MEDICAL', 'Opened');
                    }
                    else if (this.lstcon.HEALTH_MEDICAL__c == "Completed") {
                    //this.template.querySelector('.survey1').className = 'completed game-tiles survey1';
                    this.completeSurvey1 = true;
                    console.log('HEALTH MEDICAL', 'Completed');
                    }
                    else if (this.lstcon.HEALTH_MEDICAL__c == "Locked") {
                    //this.template.querySelector('.survey1').className = 'locked game-tiles survey1';
                    this.lockSurvey1 = true;
                    console.log('HEALTH MEDICAL', 'Locked');
                    }
                    
                    
                    if (this.lstcon.COVID__c == "Opened" || this.lstcon.COVID__c == null) {
                    //this.template.querySelector('.survey2').className = 'opened game-tiles survey2';
                    this.openSurvey2 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.COVID__c == "Completed") {
                    //this.template.querySelector('.survey2').className = 'completed game-tiles survey2';
                    this.completeSurvey2 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.COVID__c == "Locked") {
                    //this.template.querySelector('.survey2').className = 'locked game-tiles survey2';
                    this.lockSurvey2 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.BRAIN_DISEASE__c == "Opened" || this.lstcon.BRAIN_DISEASE__c == null) {
                    //this.template.querySelector('.survey3').className = 'opened game-tiles survey3';
                    this.openSurvey3 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.BRAIN_DISEASE__c == "Completed") {
                    //this.template.querySelector('.survey3').className = 'completed game-tiles survey3';
                    this.completeSurvey3 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.BRAIN_DISEASE__c == "Locked") {
                    //this.template.querySelector('.survey3').className = 'locked game-tiles survey3';
                    this.lockSurvey3 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.SES__c == "Opened" || this.lstcon.SES__c == null) {
                    //this.template.querySelector('.survey4').className = 'opened game-tiles survey4';
                    this.openSurvey4 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.SES__c == "Completed") {
                    //this.template.querySelector('.survey4').className = 'completed game-tiles survey4';
                    this.completeSurvey4 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.SES__c == "Locked") {
                    //this.template.querySelector('.survey4').className = 'locked game-tiles survey4';
                    this.lockSurvey4 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.FHAD__c == "Opened" || this.lstcon.FHAD__c == null) {
                    //this.template.querySelector('.survey5').className = 'opened game-tiles survey5';
                    this.openSurvey5 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.FHAD__c == "Completed") {
                    //this.template.querySelector('.survey5').className = 'completed game-tiles survey5';
                    this.completeSurvey5 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.FHAD__c == "Locked") {
                    //this.template.querySelector('.survey5').className = 'locked game-tiles survey5';
                    this.lockSurvey5 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.WOMENS_HEALTH__c == "Opened" || this.lstcon.WOMENS_HEALTH__c == null) {
                    //this.template.querySelector('.survey6').className = 'opened game-tiles survey6';
                    this.openSurvey6 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.WOMENS_HEALTH__c == "Completed") {
                    //this.template.querySelector('.survey6').className = 'completed game-tiles survey6';
                    this.completeSurvey6 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.WOMENS_HEALTH__c == "Locked") {
                    //this.template.querySelector('.survey6').className = 'locked game-tiles survey6';
                    this.lockSurvey6 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.SUBJECTIVE_ENGLISH__c == "Opened" || this.lstcon.SUBJECTIVE_ENGLISH__c == null) {
                    //this.template.querySelector('.survey7').className = 'opened game-tiles survey7';
                    this.openSurvey7 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.SUBJECTIVE_ENGLISH__c == "Completed") {
                    //this.template.querySelector('.survey7').className = 'completed game-tiles survey7';
                    this.completeSurvey7 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.SUBJECTIVE_ENGLISH__c == "Locked") {
                    //this.template.querySelector('.survey7').className = 'locked game-tiles survey7';
                    this.lockSurvey7 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.SLEEP__c == "Opened" || this.lstcon.SLEEP__c == null) {
                    //this.template.querySelector('.survey8').className = 'opened game-tiles survey8';
                    this.openSurvey8 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.SLEEP__c == "Completed") {
                    //this.template.querySelector('.survey8').className = 'completed game-tiles survey8';
                    this.completeSurvey8 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.SLEEP__c == "Locked") {
                    //this.template.querySelector('.survey8').className = 'locked game-tiles survey8';
                    this.lockSurvey8 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.ADL__c == "Opened" || this.lstcon.ADL__c == null) {
                    //this.template.querySelector('.survey9').className = 'opened game-tiles survey9';
                    this.openSurvey9 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.ADL__c == "Completed") {
                    //this.template.querySelector('.survey9').className = 'completed game-tiles survey9';
                    this.completeSurvey9 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.ADL__c == "Locked") {
                    //this.template.querySelector('.survey9').className = 'locked game-tiles survey9';
                    this.lockSurvey9 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.DIET__c == "Opened" || this.lstcon.DIET__c == null) {
                    //this.template.querySelector('.survey10').className = 'opened game-tiles survey10';
                    this.openSurvey10 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.DIET__c == "Completed") {
                    //this.template.querySelector('.survey10').className = 'completed game-tiles survey10';
                    this.completeSurvey10 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.DIET__c == "Locked") {
                    //this.template.querySelector('.survey10').className = 'locked game-tiles survey10';
                    this.lockSurvey10 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.PERCEIVED_STRESS__c == "Opened" || this.lstcon.PERCEIVED_STRESS__c == null) {
                    //this.template.querySelector('.survey11').className = 'opened game-tiles survey11';
                    this.openSurvey11 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.PERCEIVED_STRESS__c == "Completed") {
                    //this.template.querySelector('.survey11').className = 'completed game-tiles survey11';
                    this.completeSurvey11 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.PERCEIVED_STRESS__c == "Locked") {
                    //this.template.querySelector('.survey11').className = 'locked game-tiles survey11';
                    this.lockSurvey11 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.SWLS__c == "Opened" || this.lstcon.SWLS__c == null) {
                    //this.template.querySelector('.survey12').className = 'opened game-tiles survey12';
                    this.openSurvey12 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.SWLS__c == "Completed") {
                    //this.template.querySelector('.survey12').className = 'completed game-tiles survey12';
                    this.completeSurvey12 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.SWLS__c == "Locked") {
                    //this.template.querySelector('.survey12').className = 'locked game-tiles survey12';
                    this.lockSurvey12 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.QPAR__c == "Opened" || this.lstcon.QPAR__c == null) {
                    //this.template.querySelector('.survey13').className = 'opened game-tiles survey13';
                    this.openSurvey13 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.QPAR__c == "Completed") {
                    //this.template.querySelector('.survey13').className = 'completed game-tiles survey13';
                    this.completeSurvey13 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.QPAR__c == "Locked") {
                    //this.template.querySelector('.survey13').className = 'locked game-tiles survey13';
                    this.lockSurvey13 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.SOCIAL_STRESSOR__c == "Opened" || this.lstcon.SOCIAL_STRESSOR__c == null) {
                    //this.template.querySelector('.survey14').className = 'opened game-tiles survey14';
                    this.openSurvey14 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.SOCIAL_STRESSOR__c == "Completed") {
                    //this.template.querySelector('.survey14').className = 'completed game-tiles survey14';
                    this.completeSurvey14 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.SOCIAL_STRESSOR__c == "Locked") {
                    //this.template.querySelector('.survey14').className = 'locked game-tiles survey14';
                    this.lockSurvey14 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.ANXIETY__c == "Opened" || this.lstcon.ANXIETY__c == null) {
                    //this.template.querySelector('.survey15').className = 'opened game-tiles survey15';
                    this.openSurvey15 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.ANXIETY__c == "Completed") {
                    //this.template.querySelector('.survey15').className = 'completed game-tiles survey15';
                    this.completeSurvey15 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.ANXIETY__c == "Locked") {
                    //this.template.querySelector('.survey15').className = 'locked game-tiles survey15';
                    this.lockSurvey15 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.SOCIAL_SUPPORT__c == "Opened" || this.lstcon.SOCIAL_SUPPORT__c == null) {
                    //this.template.querySelector('.survey16').className = 'opened game-tiles survey16';
                    this.openSurvey16 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.SOCIAL_SUPPORT__c == "Completed") {
                    //this.template.querySelector('.survey16').className = 'completed game-tiles survey16';
                    this.completeSurvey16 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.SOCIAL_SUPPORT__c == "Locked") {
                    //this.template.querySelector('.survey16').className = 'locked game-tiles survey16';
                    this.lockSurvey16 = true;
                    console.log('Locked');
                    }
                    
                    
                    if (this.lstcon.CANCER__c == "Opened" || this.lstcon.CANCER__c == null) {
                    //this.template.querySelector('.survey17').className = 'opened game-tiles survey17';
                    this.openSurvey17 = true;
                    console.log('Opened');
                    }
                    else if (this.lstcon.CANCER__c == "Completed") {
                    //this.template.querySelector('.survey17').className = 'completed game-tiles survey17';
                    this.completeSurvey17 = true;
                    console.log('Completed');
                    }
                    else if (this.lstcon.CANCER__c == "Locked") {
                    //this.template.querySelector('.survey17').className = 'locked game-tiles survey17';
                    this.lockSurvey17 = true;
                    console.log('Locked');
                    }

            })
           /*.then(result => {
                this.error = undefined;
                 if(this.macTouch){
                     this.restrictGame = result;
                 } 
                 console.log('macTouch: ' + this.macTouch);               
                 console.log('Postal Code: ' + this.lstcon.MailingPostalCode);
                 console.log('restrictGame: '+ result);
             }) */
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });
            window.onmousemove = function() {
                this.hasMouse = true;
            }

    }
                         
       
    /* connectedCallback() {
        this.loadContactFields();
    }

    async loadContactFields() {
        try {
            const result = await this.updateContactFields();
            if (result === 'success') {
                await this.fetchContactInfo();
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    }

    async updateContactFields() {
        try {
            const result = await updateRecord({
                fields: {
                    Id: this.participantCode,
                }
            });
            return result;
        } catch (error) {
            // Handle error
            return 'failed';
        }
    }

    async fetchContactInfo() {
        try {
            const contactInfo = await getCurrentContact({ participantcode: this.participantCode });
            if (contactInfo) {
                const contactEmail = contactInfo.Email;
                const contactId = contactInfo.Id;
                this.url_healthsurvey = `${Community_Url_MC_Cloud}${url_Health_Medical_Survey}?Email=${contactEmail}&Contact=${contactId}`;
            }
        } catch (error) {
            // Handle error
        }
    } */

    healthMedicalsurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                console.log('Result..', this.lstcon);
                this.url_HealthMedicalSurvey = `${Community_Url_MC_Cloud}${url_Health_Medical_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_HealthMedicalSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlhealth();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined;
                console.log('Result..', this.lstcon);
                });

    }
    navigateToUrlhealth(){

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.url_HealthMedicalSurvey
            }
        });

    } 

    COVIDSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_COVIDSurvey = `${Community_Url_MC_Cloud}${url_COVID_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_COVIDSurvey);
                if (this.lstcon.Unsubscribe__c == false) {
                    this.navigateToUrlCOVID();
                }
            })
            .catch(error => {
                this.error = error;
                this.lstcon = undefined;
            });
    }
    
    navigateToUrlCOVID() {

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_COVIDSurvey
                }
            });
    } 

    BrainDiseaseSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_BrainDiseaseSurvey = `${Community_Url_MC_Cloud}${url_Brain_Disease_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_BrainDiseaseSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlBrain();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlBrain(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_BrainDiseaseSurvey
                }
            });
    } 
        
    SESSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_SESSurvey = `${Community_Url_MC_Cloud}${url_SES_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_SESSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlSES();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlSES(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_SESSurvey
                }
            });
    } 

    FHADSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_FHADSurvey = `${Community_Url_MC_Cloud}${url_FHAD_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_FHADSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlFHAD();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlFHAD(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_FHADSurvey
                }
            });
    }

    WomenHealthSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_WomenHealthSurvey = `${Community_Url_MC_Cloud}${url_Women_Health_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_WomenHealthSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlWomen();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlWomen(){

           this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_WomenHealthSurvey
                }
            });
    } 


    SubjectiveEnglishSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_SubjectiveEnglishSurvey = `${Community_Url_MC_Cloud}${url_Subjective_English_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_SubjectiveEnglishSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlSubjective();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlSubjective(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_SubjectiveEnglishSurvey
                }
            });
    } 


    SleepSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_SleepSurvey = `${Community_Url_MC_Cloud}${url_Sleep_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_SleepSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlSleep();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlSleep(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_SleepSurvey
                }
            });
    } 

    ADLSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_ADLSurvey = `${Community_Url_MC_Cloud}${url_ADL_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_ADLSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlADL();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlADL(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_ADLSurvey
                }
            });
    }

    DietSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_DietSurvey = `${Community_Url_MC_Cloud}${url_Diet_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_DietSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlDiet();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlDiet(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_DietSurvey
                }
            });
    }


    PerceivedStressSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_PerceivedStressSurvey = `${Community_Url_MC_Cloud}${url_Perceived_Stress_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_PerceivedStressSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlPerceived();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlPerceived(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_PerceivedStressSurvey
                }
            });
    }


    SWLSSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_SWLSSurvey = `${Community_Url_MC_Cloud}${url_SWLS_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_SWLSSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlSWLS();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlSWLS(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_SWLSSurvey
                }
            });
    } 


    QPARSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_QPARSurvey = `${Community_Url_MC_Cloud}${url_QPAR_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_QPARSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlQPAR();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlQPAR(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_QPARSurvey
                }
            });
    } 

    SocialStressSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_SocialStressSurvey = `${Community_Url_MC_Cloud}${url_Social_Stress_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_SocialStressSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlSocial();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlSocial(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_SocialStressSurvey
                }
            });
    } 


    AnxietySurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_AnxietySurvey = `${Community_Url_MC_Cloud}${url_Anxiety_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_AnxietySurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlAnxiety();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlAnxiety(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_AnxietySurvey
                }
            });
    } 


    SocialSupportSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_SocialSupportSurvey = `${Community_Url_MC_Cloud}${url_Social_Support_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_SocialSupportSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlSocialSupport();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlSocialSupport(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_SocialSupportSurvey
                }
            });
    } 

    CancerSurveyClick() {
        getCurrentContact()
            .then(result => {
                this.lstcon = result;
                this.error = undefined;
                this.url_CancerSurvey = `${Community_Url_MC_Cloud}${url_Cancer_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
                console.log('Result..', this.url_CancerSurvey);
                if(this.lstcon.Unsubscribe__c == false) {
                this.navigateToUrlCancer();
                }
                })
                .catch(error => {
                this.error = error;
                this.lstcon = undefined; // Corrected variable name
                });

    }
    navigateToUrlCancer(){

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.url_CancerSurvey
                }
            });
    } 

    getCookie(name) {
        var cookieString = "; " + document.cookie;
        cookieString = cookieString.replace('LSKey-c$', '');
        var parts = cookieString.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    }

}