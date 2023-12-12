import { LightningElement, track, wire,api } from 'lwc';
import studiesForm from '@salesforce/schema/Studies__c';
import StudyId from '@salesforce/schema/Studies__c.Study_Id__c';
import ParticipantId from '@salesforce/schema/Studies__c.Participant_Id__c';
import createStudy from '@salesforce/apex/MindCrowdStudies.studies';
import createstudiesUsingText from '@salesforce/apex/MindCrowdStudies.studiesUsingText';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import Community_Url from '@salesforce/label/c.Community_Url';
import testlanguage from '@salesforce/label/c.url_testlanguage';
import studyIdSelect from '@salesforce/apex/MindCrowdStudies.studiesIDSelect';
import eventIdSelect from '@salesforce/apex/MindCrowdStudies.eventIDSelect';
import Id from '@salesforce/schema/Account.Id';
import { CurrentPageReference } from 'lightning/navigation';




export default class Studies extends NavigationMixin(LightningElement) {

    @track ErrorModalOpen = false;
    @track stu=studiesForm;
    @track ErrorModalOpenForBlankParticipantId = false;
    @track ErrorModalOpenForWrongParticipantId = false;
  
    studiesPicklist=[];
    studieslist;
    eventPicklist=[];
    eventlist;
    checkStudyEvent=true;
    studyTrue=false;
    eventTrue=false;
    error;
    requiredField1="";
    requiredField2="";
    requiredField3="";
    requiredField4="";
    requiredField5="";
    studyRequiredField1=false;
    //partRequiredField2=false;
    eventRequiredField3=false;
    chooseOne=false;
    chooseContact=false;
    currentPageReference = null;
    urlStateParameters = {};
    participantFromUrl=false;

    @api Studies_text1 = "Welcome to";
    @api Studies_text2 ="MindCrowd!";
    @api Studies_text3 ="MindCrowd is a web-based study of how the brain works with the goal of enrolling 1 million people to help us learn more about brain-related diseases.";
	@api Studies_text4 = "You have been referred to join this study by one of our scientific collaborators because we believe that combining data from different studies will help us learn more about your brain.";
    @api Studies_text5 ="To get started, please fill out the fields below using the information that was provided to you.";
	@api Studies_text6 = "Study";
    @api Studies_text7 ="Participant ID:";
	@api Studies_text8 = "Event";
    @api Studies_text9 ="Event ID:";
	@api Studies_text10 ="Join the Study";
	@api Studies_error1 = "Please fill the required fields.";
    @api Studies_error2 ="Please select the Event Id.";
	@api Studies_error3 ="This URL is invalid!";
    @api Studies_error4 = "Please select the Study OR the Event!";
    @api Studies_error5 = "The Participant ID you have entered appear to be invalid !";
    @api Studies_error6 = "The Participant ID you have entered is invalid! Please check the ID and enter it again. Note that Participant IDs are case-sensitive and for that reason we recommend using copy and paste to ensure that the ID matches what was provided to you.";
    @api Select_Event = "Choose Event ID";
    @api strTitle;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.urlStateParameters = currentPageReference.state;
            console.log('currentPageReference.state:',currentPageReference.state);
            //Commented this.urlStateParameters.study!=undefined && by Sibi for TSS-40
            if(this.urlStateParameters.participant!=undefined){
                this.participantFromUrl=false;
              // this.template.querySelector('.participantFromUrl').className='slds-hidden';
               console.log('currentPageReferenc');
                console.log('std,parid:',this.urlStateParameters.study,this.urlStateParameters.participant);
                this.stu.Name = this.urlStateParameters.study || null;
                this.stu.Participant_Id__c = this.urlStateParameters.participant || null;
                this.joinTheStudyUrl();
            }
            else{
                this.participantFromUrl=true;
            }
           
        }
      
    };

    

    handleStudy(event){
        if(event.target.checked){
            this.stu.Event_Id__c=undefined;
            this.template.querySelector('.event').checked=false;
            this.eventTrue=false;
            this.studyTrue=true;     
        }
    }
    handleEvent(event){
        if(event.target.checked){
            this.stu.Name=undefined;
            this.stu.Participant_Id__c=undefined;
            this.template.querySelector('.study').checked=false;
            this.studyTrue=false;
            this.eventTrue=true;
        }
    }
    handleEventId(event){
        this.stu.Event_Id__c = event.target.value;
        this.stu.Name = undefined;
        this.stu.Participant_Id__c = undefined;
    }
    handleParticipantId(event){
        this.stu.Participant_Id__c = event.target.value;
    }
    closeModal() {
        this.ErrorModalOpen = false;     
    }
    closeModalError() {
        this.ErrorModalOpenForBlankParticipantId = false;
    }
    closeModalWrongPi() {
        this.ErrorModalOpenForWrongParticipantId = false;
    }
    constructor() {
        super();
        eventIdSelect().then(result => {
            for(var  i=0; i<result.length;i++){
                this.eventPicklist.push((result[i].Event_Id__c));
            }
            this.eventlist = this.eventPicklist.map(plValue => {
                return {
                    label: plValue,
                    value: plValue
                };
            });
        }).catch(error => {
            this.error = error;
        });
    }
    joinTheStudy()
    {
        console.log('my result2');
        console.log('this.stu ',this.stu );
        if(this.template.querySelector('.event').checked==false &&  this.template.querySelector('.study').checked==false)
        {
            this.participantFromUrl=true;
            this.ErrorModalOpen = true;
            document.querySelector("body").style.overflow = 'visible';
            this.requiredField4=this.Studies_error4;
            this.chooseOne=true;
            this.chooseContact=false;
        }
        else{
            if(this.template.querySelector('.study').checked==true && this.template.querySelector('.event').checked==false)
            {
                if(this.stu.Participant_Id__c==null ||this.stu.Participant_Id__c==""){
                    this.ErrorModalOpenForBlankParticipantId=true;
                }
                else{
                    this.eventRequiredField3=false;
                    this.studyRequiredField1=false;
                   // this.partRequiredField2=false;
                    this.ErrorModalOpenForWrongParticipantId=false;
                    this.chooseOne=false;
                    this.chooseContact=false;
                    console.log('this.stu ',this.stu );
                  //  }
                  createstudiesUsingText({ study : this.stu })
                    .then(result => {
                        console.log('my result2',result);
                        this.message = result;
                        this.error = undefined;
                        this.stu.Event_Id__c = undefined;
                        localStorage.setItem('studiesId', btoa(JSON.stringify(this.message[2])));
                        if ((this.message[1]==''||this.stu.Participant_Id__c==''||this.stu.Participant_Id__c==null || this.message[1]==undefined)) {
                            this.ErrorModalOpen = false;
                            document.querySelector("body").style.overflow = 'visible';      
                            //this.requiredField2=this.Studies_error5;
                            //this.partRequiredField2=true;
                            this.ErrorModalOpenForWrongParticipantId=true;
                            this.eventRequiredField3=false;
                            this.chooseOne=false;
                            this.chooseContact=false;
                        }
                        else{
                            this.eventRequiredField3=false;
                           // this.partRequiredField2=false;
                            this.ErrorModalOpenForWrongParticipantId=false;
                            this.chooseOne=false;
                            this.chooseContact=false;
                        } 
                        if( this.message[1]==this.stu.Participant_Id__c && this.stu.Participant_Id__c!='' && this.stu.Participant_Id__c!=null ) {
                                this.chooseContact=false;
                                window.location=Community_Url + "/s/"+testlanguage;
                        }
                    })
                    .catch(error => {
                        this.message = undefined;
                        this.error = error;
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error creating record',
                                message: error.body.message,
                                variant: 'error',
                            })
                        )
                    });
                }
                
            }
            else if(this.template.querySelector('.event').checked==true && this.template.querySelector('.study').checked==false){
                if(this.stu.Event_Id__c==null ||  this.stu.Event_Id__c==undefined)
                {       
                    this.ErrorModalOpen = true;
                    document.querySelector("body").style.overflow = 'visible';
                    this.requiredField3=this.Studies_error2;
                    this.eventRequiredField3=true;
                    this.studyRequiredField1=false;
                    //this.partRequiredField2=false;
                    this.ErrorModalOpenForWrongParticipantId=false;
                    this.chooseOne=false;
                    this.chooseContact=false;
                }
                else{
                    this.eventRequiredField3=false;
                    this.studyRequiredField1=false;
                  //  this.partRequiredField2=false;
                    this.ErrorModalOpenForWrongParticipantId=false;
                    this.chooseOne=false;
                    this.chooseContact=false;   
                }
                if(this.stu.Event_Id__c!='' && this.stu.Event_Id__c!=null)
                {
                   
                    localStorage.setItem('eventId', btoa(JSON.stringify(this.stu.Event_Id__c)));
                    window.location=Community_Url + "/s/"+testlanguage;
                }
            }
        }
    }

    joinTheStudyUrl()
    {
        console.log('my joinTheStudyUrl');
        //Commented by Sibi for TSS-40
        /*if(this.stu.Name==null ||  this.stu.Name=='')
            {
                this.ErrorModalOpen = true;
                document.querySelector("body").style.overflow = 'visible';      
                this.requiredField1=this.Studies_error3;
                this.studyRequiredField1=true;
                this.eventRequiredField3=false;
                this.chooseOne=false;
                this.chooseContact=false;
            }
        else{
            this.eventRequiredField3=false;
            this.studyRequiredField1=false;
            this.ErrorModalOpenForWrongParticipantId=true;
            //this.partRequiredField2=false;
            this.chooseOne=false;
            this.chooseContact=false;
        }*/
        createStudy({ study : this.stu })
        .then(result => {
            console.log('my result2',result);
            this.message = result;
            this.error = undefined;
            this.stu.Event_Id__c = undefined;
            localStorage.setItem('studiesId', btoa(JSON.stringify(this.message[2])))
            if (this.stu.Participant_Id__c==''||this.stu.Participant_Id__c==null || this.message[1]==''|| this.message[1]==undefined || this.message[1]==null) {
                this.participantFromUrl=true;
                this.ErrorModalOpen = true;
                document.querySelector("body").style.overflow = 'visible';      
                this.requiredField2=this.Studies_error3;
                this.ErrorModalOpenForWrongParticipantId=true;
              //  this.partRequiredField2=true;
                this.eventRequiredField3=false;
                this.chooseOne=false;
                this.chooseContact=false;
            }
            else{
                this.eventRequiredField3=false;
               // this.partRequiredField2=false;
                this.ErrorModalOpenForWrongParticipantId=false;
                this.chooseOne=false;
                this.chooseContact=false;
            } 
            if(this.message[0] != null && this.message[0] != '' && this.message[1]==this.stu.Participant_Id__c && this.stu.Participant_Id__c!='' && this.stu.Participant_Id__c!=null ) {
                    this.chooseContact=false;
                    window.location=Community_Url + "/s/"+testlanguage;
            }
        })
        .catch(error => {
            this.message = undefined;
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                })
            )
        }); 
    }
}