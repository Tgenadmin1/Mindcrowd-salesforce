//  Created By: (Sunil Kumar)
// Created On: 29/07/2021
// Description/Purpose: this is the beangame TM-160 
// Apex class : "GamesController" is the class having "createBeanGameRecord" the function for inserting records using this game.
  
import { LightningElement, wire, track, api } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
// import getParticipantList from '@salesforce/apex/GamesController.getParticipantId';
import getParticipantContactID from '@salesforce/apex/GamesController.getParticipantContactID';
import createBeanGameRecord from '@salesforce/apex/GamesController.createBeanGameRecord';
import beanGameObject from '@salesforce/schema/Bean_Game__c';
import left_1_ExerciseGoing from '@salesforce/schema/Bean_Game__c.LeftHand_1_ExerciseGoing__c';
import left_2_ExerciseGoing from '@salesforce/schema/Bean_Game__c.LeftHand_2_ExerciseGoing__c';
import left_3_ExerciseGoing from '@salesforce/schema/Bean_Game__c.LeftHand_3_ExerciseGoing__c';
import left_4_ExerciseGoing from '@salesforce/schema/Bean_Game__c.LeftHand_4_ExerciseGoing__c';
import right_1_ExerciseGoing from '@salesforce/schema/Bean_Game__c.RightHand_1_ExerciseGoing__c';
import right_2_ExerciseGoing from '@salesforce/schema/Bean_Game__c.RightHand_2_ExerciseGoing__c';
import right_3_ExerciseGoing from '@salesforce/schema/Bean_Game__c.RightHand_3_ExerciseGoing__c';
import right_4_ExerciseGoing from '@salesforce/schema/Bean_Game__c.RightHand_4_ExerciseGoing__c';
import oneLastThing from '@salesforce/schema/Bean_Game__c.OneLastThing__c';
import { getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import community_url from '@salesforce/label/c.Community_Url';
import Games_Dashboard from '@salesforce/label/c.Games_Dashboard';
import {NavigationMixin} from 'lightning/navigation';

export default class BeanGameViewForm extends NavigationMixin(LightningElement) {
    logoimage =  images + '/images/MindCrowd+Logo+FORM.png';
    logoimage2 =  images + '/images/mindcrowd.png';

    contactsURL;
    error;
    @track viewForm = true;
    @track ErrorModalOpen=false;
    @track ErrorParticipantCode=false;
    @track leftformResponse = false;
    @track rightformResponse = false;
    @track oneLastThing = false;
    @track refOfBean = beanGameObject;
    showButton=false;
    @api BeanGame_text29;

   




 //getting paticipant id from the url.
    currentPageReference = null;
    urlStateParameters = null;
    @api participantId = null;
    @api BeanGame_text1 = "MindCrowd Bean Game Scoresheet";
    @api BeanGame_text2 = "*Required";
    @api BeanGame_text3 = "Participant Code:";
    @api BeanGame_text4 = "DRY RUN";
    @api BeanGame_text5 = "Time: Be sure to record as minutes:seconds up to two decimal places. For example, 1 minute and 45.03 seconds would be entered as 1:45.03. If your score was less than a minute, please enter your score starting with 0: (e.g., 0:52.31)";
    @api BeanGame_text6 = "Next";
    @api BeanGame_text7 = "Left Hand";
    @api BeanGame_text8 = "1";
    @api BeanGame_text9 = "Time: Be sure to record as minutes:seconds up to two decimal place (e.g. 01:45.03)";
    @api BeanGame_text10 = "Number of Drops:";
    @api BeanGame_text11 = "I forgot where I was going";
    @api BeanGame_text12 = "2";
    @api BeanGame_text13 = "3";
    @api BeanGame_text14 = "4";
    @api BeanGame_text15 = "BACK";
    @api BeanGame_text16 = "NEXT";
    @api BeanGame_text17 = "Right Hand";
    @api BeanGame_text18 = "One last thing:";
    @api BeanGame_text19 = "If you have any questions or comments, please email:";
    @api BeanGame_text20 = "SUBMIT";
    @api BeanGame_text21 = "Thank you for your participation!";
    @api BeanGame_text22 = "Your answer";
    @api BeanGame_text23 = "Wrong Participant Code.";
    @api BeanGame_text24 = "Success";
    @api BeanGame_text25 = "BeanGame created";
    @api BeanGame_text26 = "Please fill the required fields.";
    @api BeanGame_text27 = "Submit";
    @api BeanGame_text28 = "List has no rows for assignment to SObject";
    url_gamespage = community_url + '/s/' + Games_Dashboard;


    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.urlStateParameters = currentPageReference.state;
            this.participantId = this.urlStateParameters.participantcode || null;
            console.log('participantid-----', this.participantId);
            console.log('this.urlStateParameters-----', this.urlStateParameters);
            console.log('this.this.participantId-----', this.participantId);
        }
    };

    @wire(getParticipantContactID,{participantId:'$participantId'}) getcontactvalues({ error, data }){
            if (data) {
                this.contactsURL = data;
                this.error = undefined;
                this.refOfBean.Contact__c = this.contactsURL.Id;
            } else if (error) {
                console.log('having eror3',error.body.message);
                if(error.body.message=='List has no rows for assignment to SObject')
                {this.error = this.BeanGame_text28;}
                else{this.error = error.body.message;}                
                this.ErrorParticipantCode=true;
                this.template.querySelector('.magenta-btn').setAttribute('style','display:none');
                this.contactsURL = undefined;
            }
    }
    @wire(getObjectInfo,{objectApiName:beanGameObject}) beanGameInfo;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: left_1_ExerciseGoing}) left_1_BeanExerciseGoing;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: left_2_ExerciseGoing}) left_2_BeanExerciseGoing;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: left_3_ExerciseGoing}) left_3_BeanExerciseGoing;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: left_4_ExerciseGoing}) left_4_BeanExerciseGoing;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: right_1_ExerciseGoing}) right_1_BeanExerciseGoing;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: right_2_ExerciseGoing}) right_2_BeanExerciseGoing;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: right_3_ExerciseGoing}) right_3_BeanExerciseGoing;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: right_4_ExerciseGoing}) right_4_BeanExerciseGoing;
    @wire(getPicklistValues,{recordTypeId:'$beanGameInfo.data.defaultRecordTypeId',fieldApiName: oneLastThing}) oneLastThingBeanForm;;

    formSubmit1(){
        console.log('formSubmit1: '+ JSON.stringify(this.left_2_BeanExerciseGoing.data));
        console.log('formSubmit1: '+ JSON.stringify(this.left_3_BeanExerciseGoing.data));
        console.log('formSubmit1: '+ JSON.stringify(this.left_4_BeanExerciseGoing.data));
        console.log('formSubmit1: '+ JSON.stringify(this.right_1_BeanExerciseGoing.data));
        console.log('formSubmit1: '+ JSON.stringify(this.right_2_BeanExerciseGoing.data));
        console.log('formSubmit1: '+ JSON.stringify(this.right_3_BeanExerciseGoing.data));
        console.log('formSubmit1: '+ JSON.stringify(this.right_4_BeanExerciseGoing.data));
        const isInputsCorrect = [...this.template.querySelectorAll('.require')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
                if (isInputsCorrect) {
                    this.viewForm = false;
                    this.leftformResponse= true;
                    this.rightformResponse= false;
                    this.oneLastThing = false;
                    this.thankYouPage = false;      
                }
                else{
                    this.ErrorModalOpen=true;
                   // alert('Please fill the required fields.');
                }
                if (window.location.pathname.indexOf('beangameviewform-vip') > -1) {		
                    this.showButton = true; 
                } 
    }
    formSubmit2(){             
        const isInputsCorrect = [...this.template.querySelectorAll('.require')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        if (isInputsCorrect) {
            this.viewForm = false;
            this.leftformResponse= false;
            this.rightformResponse= true;
            this.oneLastThing = false;
            this.thankYouPage = false;
        }
        else{
            this.ErrorModalOpen=true;
           // alert('Please fill the required fields.');
        }
    }
    formBack1(){
        this.viewForm = true;
        this.leftformResponse= false;
        this.rightformResponse= false;
        this.oneLastThing = false;
        this.thankYouPage = false;
    }
    formSubmit3(){
        const isInputsCorrect = [...this.template.querySelectorAll('.require')]
        .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isInputsCorrect) {
            this.viewForm = false;
            this.leftformResponse= false;
            this.rightformResponse= false;
            this.oneLastThing = true;
            this.thankYouPage = false;
        }
        else{
            this.ErrorModalOpen=true;
            //alert('Please fill the required fields.');
        }
    }
    formBack2(){
        this.viewForm = false;
        this.leftformResponse= true;
        this.rightformResponse= false;
        this.oneLastThing = false;
        this.thankYouPage = false;
    }
    formSubmit4(){
        const isInputsCorrect = [...this.template.querySelectorAll('.require')]
        .reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isInputsCorrect) {
            this.viewForm = false;
            this.leftformResponse= false;
            this.rightformResponse= false;
            this.oneLastThing = false;
            this.thankYouPage = true;
            createBeanGameRecord({ obj : this.refOfBean })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.refOfBean={};
                    this.dispatchEvent(new ShowToastEvent({
                        title: this.BeanGame_text24,
                        message: this.BeanGame_text25,
                        variant: "success"
                        }),
                    );   
                }
                //window.console.log("result of beanGame", this.message);            
            })
            .catch(error => {
                this.message = undefined+'symnole';
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                window.console.log("error", JSON.stringify(this.error));
            });
        }
        else{
            this.ErrorModalOpen=true;
            //alert('Please fill the required fields.');
        }
    }
    formBack3(){
        this.viewForm = false;
        this.leftformResponse= false;
        this.rightformResponse= true;
        this.oneLastThing = false;
        this.thankYouPage = false;
    }


//Time format custom Validation-----------
    timeValidation(queryTime,value2){
            if (value2 == '' || value2 ==  null || !/(^(?:[0123456789]|[012345]\d):(?:[012345]\d)\.(?:[0123456789]\d)$)/.test(value2)) {
                queryTime.setCustomValidity("Please enter time record in the format of MM:SS.MS or M:SS.MS !");
            } else {
                queryTime.setCustomValidity("");
            }
            queryTime.reportValidity();
    }

//Number letter custom validation-----------
    numberValidation(queryNumber,value2){
            if (value2 == '' || value2 ==  null || !/^[0-9]+$/.test(value2)) {
                queryNumber.setCustomValidity("Please enter only numeric characters!");
            } else {
                queryNumber.setCustomValidity("");
            }
            queryNumber.reportValidity();    
    }

    handleContact(event){
        this.participantId = event.target.value;  
    }
    // @wire(getParticipantContactID,{participantId:'$participantId'}) getcontactvalues({ error, data }){
    //     if (data) {
    //         this.contactsURL = data;
    //         console.log('contact  : ', this.contactsURL);
    //         this.error = undefined;
    //         this.refOfBean.Contact__c = this.contactsURL.Id;
    //     } else if (error) {
    //         this.error = error;
    //         this.contactsURL = undefined;
    //         console.log('contact  : ', this.error);
    //     }
    // }

    handleTimeChange(event){
        this.refOfBean.DryRunTime__c = event.target.value;
        let queryTime = this.template.querySelector('.dryRumTime');
        let value2 =  this.refOfBean.DryRunTime__c;
        this.timeValidation(queryTime,value2);
    }
    Left_1_TimeChange(event){
        this.refOfBean.LeftHand_1_ExerciseTime__c = event.target.value;
        let queryTime= this.template.querySelector('.left_1_Time');
        let value2 =  this.refOfBean.LeftHand_1_ExerciseTime__c; 
        this.timeValidation(queryTime,value2);
    }
    Left_1_DropsChange(event){
        this.refOfBean.LeftHand_1_ExerciseDrops__c = event.target.value;
        let queryNumber = this.template.querySelector('.left_1_Drops');
        let value2 =  this.refOfBean.LeftHand_1_ExerciseDrops__c;
        this.numberValidation(queryNumber,value2);
                        
    }
    left_1_BeanExerciseGoingHandle(event){
        this.refOfBean.LeftHand_1_ExerciseGoing__c = event.target.value;
    }
    Left_2_TimeChange(event){
        this.refOfBean.LeftHand_2_ExerciseTime__c = event.target.value;   
        let queryTime = this.template.querySelector('.left_2_Time');
        let value2 =  this.refOfBean.LeftHand_2_ExerciseTime__c; 
        this.timeValidation(queryTime,value2);
    }
    Left_2_DropsChange(event){
        this.refOfBean.LeftHand_2_ExerciseDrops__c = event.target.value;
        let queryNumber = this.template.querySelector('.left_2_Drops');
        let value2 =  this.refOfBean.LeftHand_2_ExerciseDrops__c;
        this.numberValidation(queryNumber,value2);
    }
    left_2_BeanExerciseGoingHandle(event){
        this.refOfBean.LeftHand_2_ExerciseGoing__c = event.target.value;
    }
    Left_3_TimeChange(event){
        this.refOfBean.LeftHand_3_ExerciseTime__c = event.target.value;
        let queryTime = this.template.querySelector('.left_3_Time');
        let value2 =  this.refOfBean.LeftHand_3_ExerciseTime__c; 
        this.timeValidation(queryTime,value2);
    }
    Left_3_DropsChange(event){
        this.refOfBean.LeftHand_3_ExerciseDrops__c = event.target.value;
        let queryNumber = this.template.querySelector('.left_3_Drops');
        let value2 =  this.refOfBean.LeftHand_3_ExerciseDrops__c;
        this.numberValidation(queryNumber,value2);
    }
    left_3_BeanExerciseGoingHandle(event){
        this.refOfBean.LeftHand_3_ExerciseGoing__c = event.target.value;
    }
    Left_4_TimeChange(event){
        this.refOfBean.LeftHand_4_ExerciseTime__c = event.target.value;
        let queryTime = this.template.querySelector('.left_4_Time');
        let value2 =  this.refOfBean.LeftHand_4_ExerciseTime__c;
        this.timeValidation(queryTime,value2);
    }
    Left_4_DropsChange(event){
        this.refOfBean.LeftHand_4_ExerciseDrops__c = event.target.value;
        let queryNumber = this.template.querySelector('.left_4_Drops');
        let value2 =  this.refOfBean.LeftHand_4_ExerciseDrops__c;
        this.numberValidation(queryNumber,value2);
    }
    left_4_BeanExerciseGoingHandle(event){
        this.refOfBean.LeftHand_4_ExerciseGoing__c = event.target.value;
    }
    Right_1_TimeChange(event){
        this.refOfBean.RightHand_1_ExerciseTime__c = event.target.value;
        let queryTime = this.template.querySelector('.right_1_Time');
        let value2 =  this.refOfBean.RightHand_1_ExerciseTime__c;
        this.timeValidation(queryTime,value2);
    }
    Right_1_DropsChange(event){
        this.refOfBean.RightHand_1_ExerciseDrops__c = event.target.value;
        let queryNumber = this.template.querySelector('.right_1_Drops');
        let value2 =  this.refOfBean.RightHand_1_ExerciseDrops__c;
        this.numberValidation(queryNumber,value2);
    }
    Right_1_BeanExerciseGoingHandle(event){
        this.refOfBean.RightHand_1_ExerciseGoing__c = event.target.value;
    }
    Right_2_TimeChange(event){
        this.refOfBean.RightHand_2_ExerciseTime__c = event.target.value;
        let queryTime = this.template.querySelector('.right_2_Time');
        let value2 =  this.refOfBean.RightHand_2_ExerciseTime__c;
        this.timeValidation(queryTime,value2);
    }
    Right_2_DropsChange(event){
        this.refOfBean.RightHand_2_ExerciseDrops__c = event.target.value;
        let queryNumber = this.template.querySelector('.right_2_Drops');
        let value2 =  this.refOfBean.RightHand_2_ExerciseDrops__c;
        this.numberValidation(queryNumber,value2);
    }
    Right_2_BeanExerciseGoingHandle(event){
        this.refOfBean.RightHand_2_ExerciseGoing__c = event.target.value;
    }
    Right_3_TimeChange(event){
        this.refOfBean.RightHand_3_ExerciseTime__c = event.target.value;
        let queryTime = this.template.querySelector('.right_3_Time');
        let value2 =  this.refOfBean.RightHand_3_ExerciseTime__c;
        this.timeValidation(queryTime,value2);
    }
    Right_3_DropsChange(event){
        this.refOfBean.RightHand_3_ExerciseDrops__c = event.target.value;
        let queryNumber = this.template.querySelector('.right_3_Drops');
        let value2 =  this.refOfBean.RightHand_3_ExerciseDrops__c;
        this.numberValidation(queryNumber,value2);
    }
    Right_3_BeanExerciseGoingHandle(event){
        this.refOfBean.RightHand_3_ExerciseGoing__c = event.target.value;
    }
    Right_4_TimeChange(event){
        this.refOfBean.RightHand_4_ExerciseTime__c = event.target.value;
        let queryTime = this.template.querySelector('.right_4_Time');
        let value2 =  this.refOfBean.RightHand_4_ExerciseTime__c;
        this.timeValidation(queryTime,value2);
    }
    Right_4_DropsChange(event){
        this.refOfBean.RightHand_4_ExerciseDrops__c = event.target.value;
        let queryNumber = this.template.querySelector('.right_4_Drops');
        let value2 =  this.refOfBean.RightHand_4_ExerciseDrops__c;
        this.numberValidation(queryNumber,value2);
    }
    Right_4_BeanExerciseGoingHandle(event){
        this.refOfBean.RightHand_4_ExerciseGoing__c = event.target.value;
    }
    oneLastThingBeanFormHandle(event){
        this.refOfBean.OneLastThing__c = event.target.value;
    }
    closeModal() {
        this.ErrorModalOpen = false;   
    }
    closeModalForCode(){
        this.ErrorParticipantCode=false;
    }
    navigateToMygames() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.url_gamespage
            }
        });
      }
}