//  Created By: {Girikon(Shweta Khunteta)}
// Created On: 28/05/2021
// Description/Purpose: Why and where it is used [TM-40]- A form created to save the values from 
//brainInfoResults (LWC component) to Contact Object 
// This form is exposed to community and for guest users.

import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import upsertContactResults from '@salesforce/apex/ContactController.upsertContactResults';
import insertAccount from '@salesforce/apex/ContactController.insertAccount';
//import sendEmailToController from '@salesforce/apex/ContactController.sendEmailToController';
import finish from '@salesforce/label/c.finish';
import finish_text_2 from '@salesforce/label/c.finish_text_2';
import finish_text_3 from '@salesforce/label/c.finish_text_3';
import finish_text_4 from '@salesforce/label/c.finish_text_4';
import finish_text_5 from '@salesforce/label/c.finish_text_5';
import finish_text_6 from '@salesforce/label/c.finish_text_6';
import finish_text_7 from '@salesforce/label/c.finish_text_7';
import finish_text_8 from '@salesforce/label/c.finish_text_8';
import finish_text_9 from '@salesforce/label/c.finish_text_9';
import finish_text_10 from '@salesforce/label/c.finish_text_10';
import finish_text_11 from '@salesforce/label/c.finish_text_11';
import finish_text_12 from '@salesforce/label/c.finish_text_12';
import finish_text_13 from '@salesforce/label/c.finish_text_13';
import finish_text_13a from '@salesforce/label/c.finish_text_13a';
import finish_text_14 from '@salesforce/label/c.finish_text_14';
import finish_text_15 from '@salesforce/label/c.finish_text_15';
import finish_text_16 from '@salesforce/label/c.finish_text_16';
import finish_text_17 from '@salesforce/label/c.finish_text_17';
import finish_text_18 from '@salesforce/label/c.finish_text_18';
import finish_text_21 from '@salesforce/label/c.finish_text_21';
import braininfo01 from '@salesforce/label/c.braininfo01';
import braininfo02 from '@salesforce/label/c.braininfo02';
import FirstName from '@salesforce/schema/Contact.FirstName';
import Community_Url from '@salesforce/label/c.Community_Url';
import close_btn from "@salesforce/label/c.close_btn";
import url_results from '@salesforce/label/c.url_results';
import consent_URL from '@salesforce/label/c.url_testlanguage';
import url_aboutyourbrain from '@salesforce/label/c.url_aboutyourbrain';

import images from '@salesforce/resourceUrl/mindcrowd_style';
import logErrors from '@salesforce/apex/GamesController.logError';

export default class BrainInfoResults extends LightningElement {
    

    image1 = images + '/images/mindcrowd-contributors.jpg';
    image2 = images + '/images/MindCrowd-contributors-sq.jpg';

    input_fname;
    @api input_lname;
    input_email;
    currentPageReference = null;
    urlStateParameters = null;
    urlId = null;
    contactId = null;
    isSuccessMessage = false;
    userinfo = false;
    finishTshow = false;
    resultsTshow = false;
    accountid;
    @track ErrorModalOpen = false;
    @track ErrorModalOpenOther = false;
    requiredField1="";
    requiredField2="";
    requiredField3="";
    emailcheck=false;
    fstName=false;
    lstName=false;
    isDisabled=false;
    showPhoneNum=false;
    phone='';

    label = {
        finish,
        finish_text_2,
        finish_text_3,
        finish_text_4,
        finish_text_5,
        finish_text_6,
        finish_text_7,
        finish_text_8,
        finish_text_9,
        finish_text_10,
        finish_text_11,
        finish_text_12,
        finish_text_13,
        finish_text_13a,
        finish_text_14,
        finish_text_15,
        finish_text_16,
        finish_text_17,
        finish_text_18,
        finish_text_21,
        
				braininfo01,
				braininfo02,
                close_btn
    }
    @api finish = "Want more MindCrowd?";
    @api finish_text_4 = "You can make a difference and learn about your brain.";
    @api braininfo01 = "Last Chance to Get a Copy of Your Results!";
    @api braininfo02 = "We can still email you your results plus a VIP invitation to play more free brain games, and updates about brain research and other studies you can join.";
    @api finish_text_12 = "Please Enter your Email.";
    @api finish_text_11 = "Email address";
    @api finish_text_3 = "Would you like to receive:A copy of your results to keep and share with your friends,A VIP invitation  to play even more brain games, and Updates about brain research and other studies you can join.";
    @api finish_text_6 = "First Name";
    @api finish_text_7 = "Numbers are not allowed";
    @api finish_text_8 = "Please Enter your First Name.";
    @api finish_text_9 = "Last Name";
    @api finish_text_10 = "Please Enter your Last Name.";
    @api finish_text_13 = "YES, PLEASE AND LET'S SEE MY RESULTS";
    @api finish_text_13a = "Yes, Please";
    @api finish_text_15 = "No, take me to my results";
    @api finish_text_16 = "You may opt-out anytime";
    @api finish_text_17 = "Please check your email address and try again.";
    @api finish_text_18 = "Please, make certain that all required information has been entered. Thank you.";
    @api finish_text_21 = "Phone number (optional)";
    @api strTitle;
   
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) { 
        var documentUrl = document.location.href.substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1);
        console.log('documentUrl=', documentUrl);
        if(documentUrl == url_results){
            
            this.resultsTshow = true;
                
        }else{
            this.finishTshow = true;
        }  
        if (currentPageReference) {
            this.urlStateParameters = currentPageReference.state;
            this.preventLeaving();
            this.setParametersBasedOnUrl();
            console.log('currentPageReference=', document.location.href);
            this.urlId = localStorage.getItem('c__id');
            console.log('my selected urlId', this.urlId);
            if (this.urlId != null){
                this.contactId = atob(this.urlId);
                console.log('document.cookie this.contactId = ', this.contactId);
            }    
            else
                this.contactId = "";
                console.log('my contactId', this.contactId);
        }
    };

    connectedCallback(){
        if (document.getElementsByTagName("html")[0].getAttribute("lang") == 'en-US') {
            this.showPhoneNum = true;
        }  
    }

    setParametersBasedOnUrl() {
        //this.urlId = this.urlStateParameters.id || null;
        //this.getCookie('userinfo') //this.urlStateParameters.userinfo;
        var tempVar = localStorage.getItem('userinfo'); 
        //
        if(tempVar == 'true'){
            console.log('userinfo = ', this.userinfo);
            this.allowLeaving();
            this.userinfo = true;
        }else{
            this.userinfo = false;
        }
    };

    handleFirstName(event) {
        this.input_fname = event.target.value;
        console.log('input name---', this.input_fname);
        let FirstName = this.template.querySelector(".FirstNamerequire");
        // let value1 = this.input_fname;
        console.log('value1 is ####----', this.input_fname);
        this.input_fname = this.input_fname.trim();
        //let value1 =  this.input_fname;
        if (this.input_fname == '' || this.input_fname == null) {
            console.log("in error");
            FirstName.setCustomValidity("Please do not press Space key !");
        } else {
            FirstName.setCustomValidity("");
        }
        FirstName.reportValidity();

    }
    handleLastName(event) {
        const userInput = event.target.value;
        this.input_lname = userInput;

        let LasttName = this.template.querySelector(".LastNamerequire");

        this.input_lname = this.input_lname.trim();

        if (this.input_lname == '' || this.input_lname == null) {
            console.log('in errorlast name');
            LasttName.setCustomValidity("Please do not press Space key !");
        } else {
            LasttName.setCustomValidity("");
        }
        LasttName.reportValidity();
    }
    handleEmail(event) {
        this.input_email = event.target.value;
        console.log('input email---', this.input_email);
        
    }
    handlePhone(event) {
       //let phone = event.target.value;
        //this.phone = phone.substring(0, 40);
        this.phone = event.target.value;
        console.log('input phone---', this.phone);
    }
    goNextPage() {
        this.allowLeaving();
       // window.location.replace(Community_Url + "/s/"+url_results + '?'  + 'id=' + btoa(JSON.stringify(this.contactId)));     
       window.location.replace(Community_Url + "/s/"+url_results );   
    }
    updateContactRes() {        
        //=================validation=================
        let email = this.template.querySelector('.email');
        let value1 = this.input_email;
        const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value1 == '' || value1 == null || !emailRegex.test(value1)) {
            this.emailcheck=true; 
            email.setCustomValidity('hhhh');  
            this.requiredField1="Please enter the Email Address.(eg: username@example.com)";
        } 
        else {
            this.emailcheck=false; 
            this.requiredField1="";
            email.setCustomValidity("");
        }
        email.reportValidity();

        let fname = this.template.querySelector('.fname');
        let value7 = this.input_fname;
        if (value7 == '' || value7 == null) {
            this.fstName=true;
            fname.setCustomValidity("hhhh");
            this.requiredField2="Please enter First Name.";
        } 
        else {
            this.fstName=false;
            this.requiredField2="";
            fname.setCustomValidity("");
        }
        fname.reportValidity();

        let lname = this.template.querySelector('.lname');
        let value3 = this.input_lname;
        if (value3 == '' || value3 == null) {
            this.lstName=true;
            lname.setCustomValidity('hhhh');
            this.requiredField3="Please enter Last Name.";
        } 
        else {
            this.lstName=false;
            this.requiredField3="";
            lname.setCustomValidity("");
        }
        lname.reportValidity();





        //================================================================
            console.log('IN updatecontactresults---', this.contactId);
            //create account record based on the contact lastName.
            this.isDisabled = true;
            const isInputsCorrect = [...this.template.querySelectorAll('.require')]
			.reduce((validSoFar, inputField) => {
				inputField.reportValidity();
				return validSoFar && inputField.checkValidity();
			}, true);
            console.log('isInputsCorrect: '+isInputsCorrect);
            if (isInputsCorrect) 
            {
                insertAccount({
                    accNameParamInApex: this.input_fname + ' ' + this.input_lname
                }).then(result => {
                    this.accountid = result;
                    window.console.log('after save' + this.accountid);
                    console.log('accountid is in updatecon:' + this.accountid);
                    //perform success logic
                    upsertContactResults({
                        contactId: this.contactId,
                        fname: this.input_fname,
                        lname: this.input_lname,
                        email: this.input_email,
                        phone: this.phone,
                        accountName: this.accountid,
                        urlId: this.urlId
                        // newsletters: this.input_newsletters
                    }).then(result => {
                            if (result) {
                                //this.sendEmailAfterSubmit();
                                this.allowLeaving();
                                localStorage.setItem('userinfo', true);   
                               if(document.location.href != Community_Url + "/s/"+url_results){
                                window.location.replace(Community_Url + "/s/"+url_results);   
                               }else{
                                this.userinfo = true;
                               }
                                console.log('fields updated', result);              
                            } else {
                                console.log('Fields NOT updated', result);
                            }
                        }).catch(error => {
                            this.isDisabled = false;
                            console.log('error: ', error);
                        });           
    
                }).catch(error => {
                    this.isDisabled = false;
                    this.error = error.message;
                    window.console.log(this.error);
                });
			
            }	
			else 
            {
              this.isDisabled = false;
              if(value1 == '' || value1 == null || !emailRegex.test(value1)){ 
                this.ErrorModalOpen = true;
                document.querySelector("body").style.overflow = 'visible';                
              }
              else{ 
                this.ErrorModalOpenOther = true;
                document.querySelector("body").style.overflow = 'visible';
              }     
            }

    }
    closeModal() {
        //this.isModalOpen = false;
        this.ErrorModalOpen = false;
          
    }
    closeModalOthers(){ 
        this.ErrorModalOpenOther = false;
    }

    sendEmailAfterSubmit(){
        console.log('in sendEmail after submit---');
        const recordInput= { toSend: this.input_email}
        sendEmailToController(recordInput);
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