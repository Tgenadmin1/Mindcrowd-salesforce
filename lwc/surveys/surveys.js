import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCurrentContact from '@salesforce/apex/CustomLoginController.getCurrentContact';
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
import url_Heat_Survey from '@salesforce/label/c.url_Heat_Survey';
import Health_Medical from '@salesforce/label/c.survey_name_1';
import COVID from '@salesforce/label/c.survey_name_2';
import Brain_Disease from '@salesforce/label/c.survey_name_3';
import SES from '@salesforce/label/c.survey_name_4';
import FHAD from '@salesforce/label/c.survey_name_5';
import Women_Health from '@salesforce/label/c.survey_name_6';
import English from '@salesforce/label/c.survey_name_7';
import Sleep from '@salesforce/label/c.survey_name_8';
import ADL from '@salesforce/label/c.survey_name_9';
import Diet from '@salesforce/label/c.survey_name_10';
import Perceived_Stress from '@salesforce/label/c.survey_name_11';
import SWLS from '@salesforce/label/c.survey_name_12';
import QPAR from '@salesforce/label/c.survey_name_13';
import Social_Stress from '@salesforce/label/c.survey_name_14';
import Anxiety from '@salesforce/label/c.survey_name_15';
import Social_Support from '@salesforce/label/c.survey_name_16';
import Cancer from '@salesforce/label/c.survey_name_17';
import Heat from '@salesforce/label/c.survey_name_18';
import game_name_c from '@salesforce/label/c.game_name_c';
import survey_time_2_min from '@salesforce/label/c.survey_time_2_min';
import survey_time_3_min from '@salesforce/label/c.survey_time_3_min';
import survey_time_5_min from '@salesforce/label/c.survey_time_5_min';

export default class surveys extends NavigationMixin(LightningElement) {    
    lstcon;
    @api survey_text_1 = "Welcome to your personal survey dashboard";
    @api survey_text_2 = "The tiles below represent short surveys that you can complete. Click a tile to launch the survey";
    @api Survey_text_2_1 = "A survey available to complete. Do these first.";
    @api Survey_text_2_2 = "A survey you have already completed. You can update these again in the future.";
    @api Survey_text_2_3 = "A locked survey. These will unlock as you complete more.";
    @api Survey_text_2_4 = "Note: Not all surveys are optimized to complete easily on a smartphone screen. We recommend using a tablet, laptop, or desktop computer for the surveys on this page.";    
    @track hasMouse = false;
    @track macTouch = false;
    @track surveyItems = [];  
    game_name_c =  game_name_c;

    connectedCallback() {
        getCurrentContact()
            .then(result => {
                if(this.getCookie('macTouch') == 'true'){
                    this.macTouch = true;
                    console.log('macTouch1 =' + this.macTouch );
                }else{
                    this.macTouch = false;
                    console.log('macTouch2 =' + this.macTouch );
                }
                this.lstcon = result;
                this.error = undefined;
                const surveyNames = [Health_Medical,COVID,Brain_Disease,SES,FHAD,Women_Health,English,Sleep,ADL,Diet,Perceived_Stress,SWLS,QPAR,Social_Stress,Anxiety,Social_Support,Cancer,Heat];
                const surveyClasses = ['survey1','survey2','survey3','survey4','survey5','survey6','survey7','survey8','survey9','survey10','survey11','survey12','survey13','survey14','survey15','survey16','survey17','survey18'];
                const surveyTimes = [survey_time_5_min,survey_time_5_min,survey_time_5_min,survey_time_3_min,survey_time_3_min,survey_time_3_min,survey_time_2_min,survey_time_5_min,survey_time_3_min,survey_time_3_min,survey_time_3_min,survey_time_2_min,survey_time_3_min,survey_time_3_min,survey_time_3_min,survey_time_3_min,survey_time_5_min,survey_time_5_min,];                
                const surveysOpenArray = [];
                const surveyLockedArray = [];
                const surveyCompletedArray = [];
                const elementPositionMap = surveyNames.reduce((map, element, index) => {
                    map[element] = index;
                    return map;
                  }, {});
                for (let i = 0; i < surveyNames.length; i++) {
                   const survey = {
                       id: i,
                       open: true,
                       complete: false,
                       lock: false,
                       surveytime: surveyTimes[i],
                       surveyname: surveyNames[i],                      
                       classname: 'opened game-tiles '+surveyClasses[i],
                       titleclass: i == 4 ? 'title1' : 'title'
                   };
                surveysOpenArray.push(survey);
                }
                for (let i = 0; i < surveyNames.length; i++) {
                const survey = {
                    id: i,
                    open: false,
                    complete: true,
                    lock: false,
                    surveytime: surveyTimes[i],                   
                    surveyname: surveyNames[i],
                    classname: 'completed game-tiles '+surveyClasses[i],
                    titleclass: i == 4 ? 'title1' : 'title'
                };
                surveyCompletedArray.push(survey);
                }
                for (let i = 0; i < surveyNames.length; i++) {
                    const survey = {
                        id: i,
                        open: false,
                        complete: false,
                        lock: true,
                        surveytime: surveyTimes[i],                    
                        surveyname: surveyNames[i],
                        classname: 'locked game-tiles '+ surveyClasses[i],
                        titleclass: i == 4 ? 'title1' : 'title'
                    };
                surveyLockedArray.push(survey);
                }
                const finalLockedArray = [];
                const finalCompletedArray = [];

                if (this.lstcon.HEALTH_MEDICAL__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[0]);
                }
                else if (this.lstcon.HEALTH_MEDICAL__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[0]);
                }
                else if (this.lstcon.HEALTH_MEDICAL__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[0]);
                }

                if (this.lstcon.COVID__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[1]);
                }
                else if (this.lstcon.COVID__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[1]);
                }
                else if (this.lstcon.COVID__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[1]);
                }

                if (this.lstcon.BRAIN_DISEASE__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[2]);
                }
                else if (this.lstcon.BRAIN_DISEASE__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[2]);
                }
                else if (this.lstcon.BRAIN_DISEASE__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[2]);
                }

                if (this.lstcon.SES__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[3]);
                }
                else if (this.lstcon.SES__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[3]);
                }
                else if (this.lstcon.SES__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[3]);
                }

                if (this.lstcon.FHAD__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[4]);
                }
                else if (this.lstcon.FHAD__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[4]);
                }
                else if (this.lstcon.FHAD__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[4]);
                }

                if (this.lstcon.WOMENS_HEALTH__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[5]);
                }
                else if (this.lstcon.WOMENS_HEALTH__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[5]);
                }
                else if (this.lstcon.WOMENS_HEALTH__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[5]);
                }

                if (this.lstcon.SUBJECTIVE_ENGLISH__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[6]);
                }
                else if (this.lstcon.SUBJECTIVE_ENGLISH__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[6]);
                }
                else if (this.lstcon.SUBJECTIVE_ENGLISH__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[6]);
                }

                if (this.lstcon.SLEEP__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[7]);
                }
                else if (this.lstcon.SLEEP__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[7]);
                }
                else if (this.lstcon.SLEEP__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[7]);
                }

                if (this.lstcon.ADL__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[8]);
                }
                else if (this.lstcon.ADL__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[8]);
                }
                else if (this.lstcon.ADL__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[8]);
                }

                if (this.lstcon.DIET__c== "Opened") {
                    this.surveyItems.push(surveysOpenArray[9]);
                }
                else if (this.lstcon.DIET__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[9]);
                }
                else if (this.lstcon.DIET__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[9]);
                }

                if (this.lstcon.PERCEIVED_STRESS__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[10]);
                }
                else if (this.lstcon.PERCEIVED_STRESS__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[10]);
                }   
                else if (this.lstcon.PERCEIVED_STRESS__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[10]);
                }

                if (this.lstcon.SWLS__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[11]);
                }
                else if (this.lstcon.SWLS__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[11]);
                }   
                else if (this.lstcon.SWLS__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[11]);
                }
                
                if (this.lstcon.QPAR__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[12]);
                } 
                else if (this.lstcon.QPAR__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[12]);
                } 
                else if (this.lstcon.QPAR__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[12]);
                }
                
                if (this.lstcon.SOCIAL_STRESSOR__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[13]);            
                } 
                else if (this.lstcon.SOCIAL_STRESSOR__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[13]);
                } 
                else if (this.lstcon.SOCIAL_STRESSOR__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[13]);
                }

                if (this.lstcon.ANXIETY__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[14]);            
                } 
                else if (this.lstcon.ANXIETY__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[14]);
                } 
                else if (this.lstcon.ANXIETY__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[14]);
                }

                if (this.lstcon.SOCIAL_SUPPORT__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[15]);            
                } 
                else if (this.lstcon.SOCIAL_SUPPORT__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[15]);
                } 
                else if (this.lstcon.SOCIAL_SUPPORT__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[15]);
                }

				if (this.lstcon.CANCER__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[16]);            
                } 
                else if (this.lstcon.CANCER__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[16]);
                } 
                else if (this.lstcon.CANCER__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[16]);
                }

				if (this.lstcon.HEAT__c == "Opened") {
                    this.surveyItems.push(surveysOpenArray[17]);            
                } 
                else if (this.lstcon.HEAT__c == "Completed") {
                    finalCompletedArray.push(surveyCompletedArray[17]);
                } 
                else if (this.lstcon.HEAT__c == "Locked") {
                    finalLockedArray.push(surveyLockedArray[17]);
                }

				const surveyItemsSorted = this.sortByOrder(this.surveyItems, 'surveyname', elementPositionMap);
                const finalCompletedArraySorted = this.sortByOrder(finalCompletedArray, 'surveyname', elementPositionMap);
                const finalLockedArraySorted = this.sortByOrder(finalLockedArray, 'surveyname', elementPositionMap);
                this.surveyItems = [...surveyItemsSorted, ...finalCompletedArraySorted, ...finalLockedArraySorted]; 
            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });
            window.onmousemove = function() {
                this.hasMouse = true;
            }
    }	
	
	sortByOrder(array, property, positionMap) {
        return [...array].sort((a, b) => positionMap[a[property]] - positionMap[b[property]]);
    }
                         
    surveyClick(event){
        event.preventDefault();
        const clickedElement = event.currentTarget;
        let url;
        if(clickedElement.classList.contains('survey1')){
            url = `${Community_Url_MC_Cloud}${url_Health_Medical_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        }
        else if(clickedElement.classList.contains('survey2')){
            url = `${Community_Url_MC_Cloud}${url_COVID_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        }   
        else if(clickedElement.classList.contains('survey3')){
            url = `${Community_Url_MC_Cloud}${url_Brain_Disease_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey4')){
            url = `${Community_Url_MC_Cloud}${url_SES_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey5')){
            url = `${Community_Url_MC_Cloud}${url_FHAD_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey6')){
            url = `${Community_Url_MC_Cloud}${url_Women_Health_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey7')){
            url = `${Community_Url_MC_Cloud}${url_Subjective_English_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey8')){
            url = `${Community_Url_MC_Cloud}${url_Sleep_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey9')){
            url = `${Community_Url_MC_Cloud}${url_ADL_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey10')){
            url = `${Community_Url_MC_Cloud}${url_Diet_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey11')){
            url = `${Community_Url_MC_Cloud}${url_Perceived_Stress_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey12')){
            url = `${Community_Url_MC_Cloud}${url_SWLS_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey13')){
            url = `${Community_Url_MC_Cloud}${url_QPAR_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey14')){
            url = `${Community_Url_MC_Cloud}${url_Social_Stress_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey15')){
            url = `${Community_Url_MC_Cloud}${url_Anxiety_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        }
        else if(clickedElement.classList.contains('survey16')){
            url = `${Community_Url_MC_Cloud}${url_Social_Support_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey17')){
            url = `${Community_Url_MC_Cloud}${url_Cancer_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
        else if(clickedElement.classList.contains('survey18')){
            url = `${Community_Url_MC_Cloud}${url_Heat_Survey}?Email=${this.lstcon.Email}&Contact=${this.lstcon.Id}`;
        } 
		this.navigateToUrl(url);
    }   

    navigateToUrl(url) {
    this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: url
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