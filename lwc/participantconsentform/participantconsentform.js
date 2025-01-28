//  Created By: {Girikon(Shweta Khunteta)}
// Created On: 05/05/2021
// Description/Purpose: Why and where it is used [TM-17]- A form created to save the values from
//participationconsentform (LWC component) to Contact Object and navigate users to acceptancepage
// or rejectionpage as they choose.This form is exposed to community.

import { LightningElement, wire, track, api } from "lwc";
import {
  getPicklistValuesByRecordType,
  getObjectInfo,getPicklistValues,
} from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import CONTACT_SHIPPINGCONSENT from '@salesforce/schema/Contact.Shipping_Consent__c';
import { NavigationMixin } from 'lightning/navigation';
import images from "@salesforce/resourceUrl/mindcrowd_style";
import { CurrentPageReference } from "lightning/navigation";
import updateContactFields from "@salesforce/apex/ContactController.updateContactFields";
import CheckAddress from "@salesforce/apex/USPS.CheckAddress";
import community_url from '@salesforce/label/c.Community_Url';
import dbsTemplate from './dbsparticipantconsentform.html';
import beangameTemplate from './beangameparticipantconsentform.html';
import covidTemplate from './participantconsentform.html';
import apoeTemplate from './apoeparticipantconsentform.html';
import close_btn from "@salesforce/label/c.close_btn";
//import fetchRecord from "@salesforce/apex/ContactController.fetchContactFields";
import fetchRecord from '@salesforce/apex/ContactController.fetchContactFields1';
//import requiredFieldValidationError from '@salesforce/label/c.Required_Fields_Error_Message';
import url_decline from '@salesforce/label/c.live_URL_9';
import url_decline_vip from '@salesforce/label/c.url_dashboard';

import { ShowToastEvent } from "lightning/platformShowToastEvent";
const FIELDS = [
  "Contact.Address1",
  "Contact.Address2",
  "Contact.City",
  "Contact.Zipcode",
  "Contact.Country",
  "Contact.State"
];

export default class Participantconsentform extends NavigationMixin(LightningElement) {
  //label = {requiredFieldValidationError};
  selected;
    render()
    {
      
        // console.log('I AM IN RENDER--', this.selected);
        this.selected=window.location.pathname;
        if(this.selected.indexOf('dbsparticipant')>-1){
          return dbsTemplate;
       }
       else if(this.selected.indexOf('beangameparticipant')>-1)
          return beangameTemplate;

       else if(this.selected.indexOf('aceptajuegofrijol')>-1)
          return beangameTemplate;

       else if(this.selected.indexOf('aceptaparticipardbs')>-1)
          return dbsTemplate;

       else if(this.selected.indexOf('aceptaparticiparcovid')>-1)
          return covidTemplate;

       else if(this.selected.indexOf('apoeparticipant')>-1)
       return apoeTemplate;

       else{
         return covidTemplate;
       }
        
    }

  logoimage = images + "/images/MindCrowd+Logo+FORM.png";
  logoimage2 = images + "/images/MindCrowd-Logo-Color-White-Text.png";
  isStateVisible = false;
  isValidateAddressButtonVisible = false;
  currentPageReference = null;
  urlStateParameters = null;
  //participantcode="";

  @track controllingValues = [];
  @track dependentValues = [];
  @track selectedCountry;
  @track selectedState;
  @track isEmpty = false;
  @track error;
  @track ErrorModalOpen = false;
  @track pCode; 
  @track isLoading = false;
  controlValues;
  totalDependentValues = [];
  participantcode;
  campaign;
  firstName;
  address1;
  address1;
  address1;
  address2;
  city;
  zipcode;
  zip5;
  zip4;
  selectedCountry;
  selectedState;
  input_shipmentconsent;
  input_shipmentconsent1;
  phoneNumber;
  firstName;
  lastName;
  showText = false;
  error1 = false;
  @api textValue = " Your address information is verified!";
  responseAddress;
  label = {close_btn};

  @api DBS_text_1="DBS Form for Participation in Research";
  @api DBS_text_2="Required";
  @api DBS_text_3="Street Address";
  @api DBS_text_4="Suite/APT No.";
  @api DBS_text_5="City";
  @api DBS_text_6="ZIP Code";
  @api DBS_text_7="Country";
  @api DBS_text_8="--None--";
  @api DBS_text_9="State";
  @api DBS_text_10="Validate Address";
  @api DBS_text_11="Invalid State Code.";
  @api DBS_text_12="Invalid City.";
  @api DBS_text_13="Address Not Found.";
  @api DBS_text_14="Address Verified.";
  @api DBS_text_15="Please read the following information carefully before deciding whether to participate in this research study. Your participation is voluntary.";
  @api DBS_text_16="You are being asked to participate in a research study that is being carried out by Dr. Matt Huentelman at the non-profit Translational Genomics Research Institute (or TGen) in Phoenix, Arizona. This is a research study to understand how the human brain remembers things.";
  @api DBS_text_17="To participate in this phase of the study, you will be asked to collect dried blood samples using a finger prick device (lancet) and a kit that we will provide you. We will then ask you to mail your samples to researchers at TGen in a prepaid return envelope. The researchers will analyze DNA, RNA, and protein biomarkers in your blood and combine the measurements with the results from your MindCrowd test score and the information that you have provided through questionnaires.";
  @api DBS_text_18="What is DNA, and what are genes and genetics?";
  @api DBS_text_19="DNA is a substance that is found in every cell in the human body.  Your DNA contains “genes” which predict things like physical characteristics (eye color, hair color, height, etc.) or disease risk.";
  @api DBS_text_20="What is RNA and protein?";
  @api DBS_text_21="RNA delivers DNA’s genetic message to the part of a cell that makes proteins. RNA gives some information about which genes are turned on or off at one point in time.";
  @api DBS_text_22="Proteins are large molecules that play many critical roles in the body. They do most of the work in cells and are required for the structure and function of the body’s tissues and organs.";
  @api DBS_text_23="How many people will take part in the study?";
  @api DBS_text_24="It is expected that up to 5,000 individuals will participate in the study.";
  @api DBS_text_25="What will I have to do?";
  @api DBS_text_26="You will be asked to complete this consent form if you choose to participate. If you decide to participate, a dried blood sample collection kit will be provided to you by the study team. You will be given instructions on how to collect dried blood samples from your finger. If you are unable to donate a dried blood sample, then a saliva sample or buccal swab may be collected instead. Your sample will be looked at and stored at TGen.";
  @api DBS_text_27="In addition, demographic, medical, and lifestyle information that was already collected when you first completed the MindCrowd study will be linked to your sample. This information and your sample will be coded with a research specific number by the study coordinator in order to protect your identity.";
  @api DBS_text_28="How old do I have to be to participate?";
  @api DBS_text_29="You must be 18 years or older to participate in this study.";
  @api DBS_text_30="Will my samples be stored and used for other studies?";
  @api DBS_text_31="Your samples will be stored at TGen indefinitely. The researchers may later decide that they want to perform additional tests on your samples. If your samples are used in future research, they may be shared with researchers who are not a part of TGen. The study investigators will approve the use of the samples for future research. All samples will be stored with no identifying information attached to the sample.";
  @api DBS_text_32="Will you share my information with other people?";
  @api DBS_text_33="We will not share any identifiable information that you give us. All of your information is stored in a database. All of our databases are password-protected and secure. No one can identify you without access to both of these data sources.";
  @api DBS_text_34="Who else will have access to my genetic information?";
  @api DBS_text_35="The researchers may decide to share data gathered from your samples to help further research. One way we do this is by putting information into scientific databases, where it is stored along with information from other studies. Researchers can then study the combined information to learn even more about diseases. If you agree to take part in the study, some of your genetic and health information might be placed into one or more scientific databases. There are many different kinds of scientific databases; some are maintained by private companies or the National Institutes of Health (an agency of the federal government). A researcher who wants to study the information must apply to the database. Different databases may have different ways of reviewing such requests. Researchers with approval may be able to see and use your de-identified information, along with information from many other people.";
  @api DBS_text_36="Your name and other information that could directly identify you will never be placed into a scientific database. However, because your genetic information is unique to you, there is a small chance that someone could trace it back to you. The risk of this happening is very small, but may grow in the future. There are many safeguards in place to protect your information while it is stored in repositories and used for research.";
  @api DBS_text_37="Will the researchers need to contact me in the future?";
  @api DBS_text_38="The researchers may decide later that they want more information about you and your health. By completing this consent form, you are giving the research team permission to contact you in the future. If the research team contacts you, you may decline to provide any information.";
  @api DBS_text_39="How long will I be in the study?";
  @api DBS_text_40="Your part in this phase of the study includes completion of the study consent (typically less than 15 minutes) and a one-time collection of dried blood samples, a saliva sample, or a buccal swab (typically less than 15 minutes).";
  @api DBS_text_41="What are the risks?";
  @api DBS_text_42="Physical Risk";
  @api DBS_text_43="There is a slight risk of excess bleeding, bruising, or infection after a dried blood sample collection, however, this risk is very low. Care will be taken to help you avoid these problems. There are no physical risks involved with the collection of saliva or buccal swab samples.";
  @api DBS_text_44="Privacy Risk";
  @api DBS_text_45="We will take many steps to protect your privacy, but because your DNA is unique to you, it is possible that someone could trace it back to you. There is also a risk that someone could get access to the data we have stored about you. If those data suggested something serious about your health, it could be misused. For example, it could be used to make it harder for you to get or keep a job or insurance. There are laws against this kind of misuse, but they may not give full protection. There may also be other unforeseen privacy risks.";
  @api DBS_text_46="We believe the chance these things will happen is small, but we cannot make guarantees. Your privacy and the confidentiality of your data are very important to us; we will make every effort to protect them. These efforts are described below under the section “How will my privacy be protected?”";
  @api DBS_text_47="How will my privacy be protected?";
  @api DBS_text_48="Federal privacy rules give safeguards for privacy, security, and authorized access. We will not give information that identifies you to anyone without your permission, except as required by law. This study takes many steps to protect the privacy of people who take part.";
  @api DBS_text_49="We will remove your name and any other information that could directly identify you from your samples and information. We will replace this information with a study code number. We will create a master list linking your code number to your name. We keep this list separate from your coded samples and information. The master list will be maintained by the TGen study coordinator.";
  @api DBS_text_50="We will keep the samples in locked freezers in locked buildings. We will keep health information and research data on secure computers. These computers have many levels of protection.";
  @api DBS_text_51="There is a Federal law called the Genetic Information Nondiscrimination Act (GINA). In general, this law makes it illegal for health insurance companies, group health plans, and most employers to discriminate against you based on your genetic information. However, it does not protect you against discrimination by companies that sell life insurance, disability insurance, or long-term care insurance.";
  @api DBS_text_52="Are there any benefits?";
  @api DBS_text_53="You will not receive any test results from the sample you donate for this study. There is no direct benefit to you by being in this study. However, what we learn from this study may help others in the future.";
  @api DBS_text_54="What are my alternatives if I don’t want to participate in the research?";
  @api DBS_text_55="This is not a treatment study. Your other option is to not give your samples to TGen.";
  @api DBS_text_56="Can I leave the study once I’m in it?";
  @api DBS_text_57="Your participation in this study is voluntary. You may decide not to participate or you may leave the study at any time. Your decision will not result in any penalty or loss of benefits to which you are entitled.";
  @api DBS_text_58="If you complete this form but then change your mind later, you will need to contact the study coordinator at MindCrowdQuestion@tgen.org or 602-343-8653.";
  @api DBS_text_59="If you withdraw from the study, TGen will retain your samples but completely erase all identifying information and codes from your samples so they will not be able to be traced back to you in any manner. This means that the samples will be made anonymous.";
  @api DBS_text_60="What about my privacy/confidentiality?";
  @api DBS_text_61="Your privacy is very important to us and we will use many safety measures to protect your privacy. However, in spite of all of the safety measures that we will use we cannot guarantee that your identity will never become known. Although your genetic information is unique to you, you do share some genetic information with your blood relatives. Consequently, it may be possible that genetic information from them could be used to help identity you. Similarly, it may be possible that genetic information from you could be used to help identify them.";
  @api DBS_text_62="All information collected about you during the course of this study will be kept confidential to the extent permitted by law. You will be identified in the research records by a code name or number. Information that identifies you personally will not be released without your written permission. However, the Translational Genomics Research Institute (TGen) or federal agencies with appropriate regulatory oversight such as the Food and Drug Administration (FDA), Office for Human Research Protections (OHRP), Office of Civil Rights (OCR), National Institutes of Health (NIH), Western Institutional Review Board® (WIRB®), may review or copy your records for research purposes.";
  @api DBS_text_63="When the results of this research are published or discussed in conferences, no information will be included that would reveal your identity.";
  @api DBS_text_64="What are the costs?";
  @api DBS_text_65="There are no costs to you to participate in this study.";
  @api DBS_text_66="Will I be paid?";
  @api DBS_text_67="You will not be paid to participate in this study.";
  @api DBS_text_68="Will I be paid if the sponsor makes money or profits from my samples?";
  @api DBS_text_69="It is possible results will come from this study that may help develop new treatments or tests. This may result in commercial products that will be sold for a profit. There are no plans to pay you for any products developed from this study.";
  @api DBS_text_70="What if there is a breach of privacy or I am injured?";
  @api DBS_text_71="There are no plans to pay you if there is a breach of privacy or if you are hurt in any way as a result of being in this study. This does not take away or waive any of your legal rights in the event of negligence or misconduct.";
  @api DBS_text_72="Who do I call if I have any questions or issues?";
  @api DBS_text_73="If you have questions about your participation in this study, you feel you have had a research-related injury, or you have questions, concerns, or complaints about the research, you may contact the study coordinator at 602-343-8653.";
  @api DBS_text_74="If you have questions about your rights as a research participant in this study or if you have questions, concerns, or complaints about the research, you may contact:";
  @api DBS_text_75="Western Institutional Review Board® (WIRB®)";
  @api DBS_text_75_a="1019 39th Avenue SE Suite 120";
  @api DBS_text_75_b="Puyallup, Washington 98374-2115";
  @api DBS_text_75_c="Telephone: 1-800-562-4789 or 360-252-2500";
  @api DBS_text_76="Help@wirb.com";
  @api DBS_text_77="WIRB is a group of people who perform independent review of research.";
  @api DBS_text_78="WIRB will not be able to answer some study-specific questions, such as questions about appointment times. However, you may contact WIRB if the research staff cannot be reached or if you wish to talk to someone other than the research staff.";
  @api DBS_text_79="Do not complete this consent form unless you have had a chance to ask questions and have received satisfactory answers to all of your questions.";
  @api DBS_text_80="If you agree to be in this study, you will have access to a completed copy of this consent form for your records.";
  @api DBS_text_81="How do I agree to participate?";
  @api DBS_text_82="There will be questions and check boxes at the end of this form. Once you have reviewed all the statements, you will either check the button that states: “I Consent” or the button that says “I Decline.”";
  @api DBS_text_83="By checking this box :";
  @api DBS_text_84="I understand that if I have questions I should contact the Clinical Research Coordinator at 602-343-8653 or MindCrowdQuestion@tgen.org before I complete this page.";
  @api DBS_text_85="I Consent";
  @api DBS_text_86="Please Enter Required Fields";
  @api DBS_text_87="Submit";
  @api DBS_text_88="Please Complete the Required Fields.";
  @api DBS_text_89="Please enter your mailing address below. The blood sample collection kit will be sent to this address.";
  @api DBS_text_90="Street";
  @api DBS_text_91="Phone Number";
  @api DBS_text_92="Enter Phone Number Here";
  @api DBS_text_93="I Decline";
  
  @api DBS_text_all="DBS Consent Text";
  @api Bean_text_all="Bean Consent Text";
  @api Bean_text_1="Bean Game Form for Participation in Research";
  @api Bean_text_2="Enter your code here";
  @api Bean_text_3="Selected Country";
  @api Bean_text_4="Selected State";
  @api Bean_text_5="Validate";
  @api Bean_text_6="You are being invited to participate in a research study that is being carried out by Dr. Matt Huentelman at  the  non-profit  Translational  Genomic  Research  Institute  (TGen)  in  Phoenix,  Arizona. This  study  will measure the time that it takes you to play a movement game.";
  @api Bean_text_7="Your participation will involve timing yourself, or asking a friend to time you, as you complete a game. We will send you a game kit including all of the materials that you will need to complete the game. You will need to self-record your results and return the results to TGen. The amount of time that it takes you to complete the game will vary between people, but we expect it to take you approximately 20 minutes.";
  @api Bean_text_8="There are no known risks associated with being in this research. There is no direct benefit to you being in this study. However, what we learn from this study may help others in the future.Your alternative is to not participate in this study.";
  @api Bean_text_9="If  you  have  questions  about  your  participation  in  this  study,  you  feel  you  have  had  a  research-related injury,  or  you  have  questions,  concerns,  or  complaints  about  the  research,  you  may  contact  the  study coordinator  at MindCrowdQuestion@tgen.org  or  602-343-8653.  Contact  the  Western  Institutional Review Board (WIRB) if you have questions about your rights as a research subject, concerns, complaints or input: 1-800-562-4789.WIRB is a group of people who perform independent review of research";
  @api Bean_text_10="The  study  staff  may  be  required  to  share  the  records  generated  from  this  research  with  the  sponsor, regulatory agencies such as the US Food and Drug Administration, Health and Human Services, and the IRB.  This  information  is  shared  so  the  research  can  be  conducted  and  properly  monitored.  The  people receiving  this  information  may  not  be  required  to  protect  it  and  your  information  may  be  re-disclosed without your permission. If you do not provide permission to use your information, you cannot be in the study.";
  @api Bean_text_11="All  information  collected  about  you  during  the  course  of  this  study  will  be  kept  confidential.  When  the results  of  this  research  are  published  or  discussed  at  scientific  conferences,  no  information  will  be included that would reveal your identity.";
  @api Bean_text_12="Your  participation  in  this  study  is  completely  voluntary.  You  may  choose  not  to  participate  or  you  may stop  participation  at  any  time  during  the  research  activity  without  penalty.  You  can  contact  the  Study Coordinator at MindCrowdQuestion@tgen.org to withdraw from the study.";
  @api Bean_text_13="This consent information sheet addendum has more information about the research study.  It may add to or change the information in the consent form you signed at the start of this study.";
  @api Bean_text_14 = "You will not be paid for being in this study.";  
  @api Bean_text_15 = "If you have questions about your participation in this study, you feel you have had a research-related injury, or you have questions, concerns, or complaints about the research, you may contact the study coordinator at MindCrowdQuestion@tgen.org or 602-343-8653 (24 hours). Contact the WCG IRB if you have questions about your rights as a research subject, concerns, complaints or input: 855-818-2289. WCG IRB is a group of people who perform independent review of research.";  
  @api Bean_text_16 = "All information collected about you during the course of this study will be kept confidential. When the results of this research are published or discussed at scientific conferences, no information will be included that would reveal your identity. To help protect your privacy, we have obtained a Certificate of Confidentiality from the National Institutes of Health. This means researchers may refuse to give out study information that identifies you. For example, if there were a court order requesting your study records, TGen would not give out information that identifies you, unless you have consented for this use. The Certificate &lt;u&gt;does&lt;/u&gt; permit TGen to disclose your information when:";  
  @api Bean_text_17 = "Required by Federal, State, or local laws. This excludes instances of Federal, State, or local civil, criminal, administrative, legislative, or other proceedings;";
  @api Bean_text_18 = "You have consented to the disclosure, including for your medical treatment;";
  @api Bean_text_19 = "Done as part of other approved research studies.";  
  @api Bean_text_20 = "A Certificate of Confidentiality does not prevent you or someone else, like a member of your family, from voluntarily sharing information about yourself or your involvement in this research. If you want your research information released to an insurer, medical care provider, or any other person not connected with the research, you must provide consent to allow the researchers to release it.";
  @api Bean_text_21 = "Your participation in this study is completely voluntary. You may choose not to participate or you may stop participation at any time during the research activity without penalty or loss of benefits to which you are otherwise entitled. You can contact the Study Coordinator at MindCrowdQuestion@tgen.org to withdraw from the study.";
  @api Bean_text_22 = "How do I agree to participate?";
  @api Bean_text_23 = "I understand that if I do not wish to participate I should not complete this page.";
  @api Bean_text_24 = "I understand that if I have questions I should contact the Clinical Research Coordinator at 602-343-8653 (24 hours) or MindCrowdQuestion@tgen.org before I complete this consent.";
  @api Bean_text_25 = "First Name";
  @api Bean_text_25a = "Enter First Name Here";
  @api Bean_text_firstNameValue;
  @api firstName_EmptyCheck;
  @api Bean_text_lastNameValue;
  @api lastName_EmptyCheck;
  @api Bean_text_emailValue;
  @api Bean_text_userIdValue;
  @api isEditable = false;
  @api Bean_text_26 = "Last Name";
  @api Bean_text_26a = "Enter Last Name Here";
  @api Bean_text_27 = "Email Address";
  @api Bean_text_27a = "Enter Email Address";
  @api Bean_text_28 = "Please enter your mailing address below. The motor activity kit will be sent to this address. Please note we can only ship to participants in the United States at this time.";
  @api Bean_text_29 = "Enter City Here";
  @api Bean_text_30 = "Select a state…";
  @api Bean_text_31 = "Enter Zip Code Here";
  @api Bean_text_32 = "Street Address (including STE/APT)";
  @api Bean_text_33 = "Enter Street Address (including STE/APT) Here";

  @api APOE_text_1="APOE Form for Participation in Research";
  @api APOE_text_all="APOE Form for Participation in Research";
  @api APOE_text_2="Please enter your mailing address below. The sample collection kit will be sent to this address.";
  @api APOE_text_3="Enter First Name Here";
  @api APOE_text_4="Enter Last Name Here";
  @api url_acceptance = 'add-acceptancepage';  
  @api url_alreadysubmitted = 'add-already-submitted';  
  @api strTitle = 'Welcome in Salesforce';
  
  
  // @track selectedValue;
  // @track options = [];
  value='';
  isAgreeVisible= true;
  vipbeangame=false;

  connectedCallback(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const participantcode = urlParams.get('participantcode')
    console.log('ConnectedCall back>>'+participantcode);
    this.pCode=participantcode;
    console.log('ConnectedCall back1>>'+this.pCode);
    const urlPath = window.location.pathname;
    if(urlPath.indexOf('beangameparticipant-consent-vip')>-1 || urlPath.indexOf('aceptajuegofrijol-vip')>-1){
      this.vipbeangame =true;
    }
} 
 
  // Contact object info
  @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
  objectInfo;

  get options() {
    return [
        // { label: 'I understand that if I do not wish to participate I should not complete this page.', value: 'decline' },
        { label: 'I understand that if I have questions I should contact the Clinical Research Coordinator at 602-343-8653 or MindCrowdQuestion@tgen.org before I complete this page.', value: 'consent' },
    ];
}
  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      this.urlStateParameters = currentPageReference.state;
      console.log("values in state are---- ", this.urlStateParameters);
      this.setParametersBasedOnUrl();
    }

    
  }

  setParametersBasedOnUrl() {
    console.log(this.urlStateParameters.participantcode);
    this.participantcode = this.urlStateParameters.participantcode;
    console.log('participantcode= '+this.participantcode);
    this.campaign=this.urlStateParameters.campaign;
    console.log("CAMPAIGN TYPE IS---",this.urlStateParameters.campaign);
    
  }


  @wire(fetchRecord, {participantcode: '$pCode'})  
  wiredContacts({ error, data }) {
    if (data) {
      this.Bean_text_firstNameValue = data.FirstName;
      this.Bean_text_lastNameValue = data.LastName;
      this.Bean_text_emailValue = data.Email;
      this.Bean_text_userIdValue=data.User_Id__c;
      if(this.Bean_text_userIdValue==null){
        this.isEditable = !this.isEditable;
      }
    }
   else if(error) {
       window.console.log('error test 2 ===> '+JSON.stringify(error));
   }
  }

  inputPhoneValue = "";

  setPhoneType(event) {
    this.inputPhoneValue = event.target.value;
    console.log('My Phone number>>',this.inputPhoneValue);
    console.log('event.keyCode>>',event.keyCode);
    if (event.keyCode != 8) {
      if (!/^[0-9]+$/.test(this.inputPhoneValue)) {
        event.target.value = this.inputPhoneValue.slice(0, -1);
      }
    }
    
    if (this.inputPhoneValue.length > 10) {
      event.target.value = this.inputPhoneValue.substring(0, 10);
    }
    //this.rec.Phone = event.target.value;
    this.phoneNumber = event.target.value;
  }
  setFirstName(event) {
    this.firstName_EmptyCheck = event.target.value;
    this.Bean_text_firstNameValue = '';
    if(event.currentTarget.value=='' || event.currentTarget.value == null || this.firstName_EmptyCheck.trim() ===''){
      console.log('Text Field is empty');
      event.currentTarget.setCustomValidity("Please select Consents!");
      event.currentTarget.reportValidity();
    }else{
      event.currentTarget.setCustomValidity("");
      event.currentTarget.reportValidity();
      this.firstName = this.firstName_EmptyCheck;
      console.log('FirstName'+this.firstName);
    }   
  }

  setLastName(event) {
    //this.lastName = event.target.value;
    this.lastName_EmptyCheck = event.target.value;
    this.Bean_text_lastNameValue = '';
    console.log('Current target value'+event.currentTarget.value);
    if(event.currentTarget.value=='' || event.currentTarget.value == null || this.lastName_EmptyCheck.trim() ===''){
      console.log('LastName Field is empty');
      event.currentTarget.setCustomValidity("Please select Consents!");
      event.currentTarget.reportValidity();
    }else{
      event.currentTarget.setCustomValidity("");
      event.currentTarget.reportValidity();
      this.lastName = this.lastName_EmptyCheck;
      console.log('LastName '+this.lastName);
    }    
  }

    
//   @wire(getPicklistValues, {
//     recordTypeId: '$contactInfo.data.defaultRecordTypeId',
//     fieldApiName: CONTACT_SHIPPINGCONSENT
// }) shippingconsent;
// typePicklistValues({error, data}) {
//   if(data) {
//       let optionsValues = [];
//       for(let i = 0; i < data.values.length; i++) {
//           optionsValues.push({
//               label: data.values[i].label,
//               value: data.values[i].value
//           })
//       }
//       this.options = optionsValues;
//       window.console.log('optionsValues ===> '+JSON.stringify(optionsValues));
//   }
//   else if(error) {
//       window.console.log('error ===> '+JSON.stringify(error));
//   }
// }


  // Picklist values based on record type
  // fetching country and state picklist values in the standard object
  @wire(getPicklistValuesByRecordType, {
    objectApiName: CONTACT_OBJECT,
    recordTypeId: "$objectInfo.data.defaultRecordTypeId"
  })
  countryPicklistValues({ error, data }) {
    console.log('objectInfo ='+ JSON.stringify(this.objectInfo));
    if (data) {
      console.log("----data--", data);
      this.error = null;

      // let countyOptions = [{label:'--None--', value:'--None--'}];
      // let countyOptions = [{label:'--us--', value:'--us--'}];
      //let countyOptions = [{ label: "United States", value: "US" }];
      let countyOptions;
      if (document.getElementsByTagName("html")[0].getAttribute("lang") == 'es') {
        countyOptions = [{ label: "Estados Unidos", value: "US" }];
      }
      else {
        countyOptions = [{ label: "United States", value: "US" }];
      }   

      //         // Account Country Control Field Picklist values
      data.picklistFieldValues.MailingCountryCode.values.forEach((key) => {
        countyOptions.push({
          label: key.label,
          value: key.value
        });
      });

      this.controllingValues = countyOptions;
      console.log("---countries list as follows---", this.controllingValues);

      let stateOptions = [{ label: "--None--", value: "--None--" }];

      //          // contact State Control Field Picklist values
      this.controlValues =
        data.picklistFieldValues.MailingStateCode.controllerValues;
      //         // contact State dependent Field Picklist values
      this.totalDependentValues =
        data.picklistFieldValues.MailingStateCode.values;

      this.totalDependentValues.forEach((key) => {
        stateOptions.push({
          label: key.label,
          value: key.value
        });
      });

      this.dependentValues = stateOptions;
      console.log("----state list is as follows---", this.dependentValues);
    } else if (error) {
      this.error = JSON.stringify(error);
      console.log(this.error);
    }
  }

  handleCountryChange(event) {
    // Selected Country Value
    this.selectedCountry = event.target.value;
    console.log(event.target.value);
    this.isEmpty = false;
    let dependValues = [];
    this.selectedState =false;

    if (this.selectedCountry) {
      // if Selected country is none returns nothing
      if (this.selectedCountry === "--None--") {
        this.isEmpty = true;
        dependValues = [{ label: "--None--", value: "--None--" }];
        this.selectedCountry = null;
        this.selectedState = null;
        return;
      } else if (this.selectedCountry == "US") {
        this.isStateVisible = true;
        

       // this.template.querySelector('.hideStateCombo').style="position:unset;opacity: 1";
        this.isValidateAddressButtonVisible = true;
        console.log("country selected is", this.selectedCountry);
        // console.log(event.detail.value, ' TRUE');
        this.error1 = true;
      } 
      else {
        this.isStateVisible = true;
        this.isValidateAddressButtonVisible = false;
        this.showText=false;
        this.error1 = false;
        console.log('event target value of country--',event.target.value);
        
          // this.address1='';
          // this.address2='';
          // this.city='';
          // this.zipcode='';
          console.log('blank values---',this.zipcode);
        
      }

      // filter the total dependent values based on selected country value
      this.totalDependentValues.forEach((conValues) => {
        if (
          conValues.validFor[0] === this.controlValues[this.selectedCountry]
        ) {
          dependValues.push({
            label: conValues.label,
            value: conValues.value
          });
        }
      });

      this.dependentValues = dependValues;
      console.log("country selected is", this.selectedCountry);
    }
  }
  handleFirstNameChange(event) {
    this.address1 = event.currentTarget.value;
   
  }
  handleLastNameChange(event) {
    this.address1 = event.currentTarget.value;
   
  }
  handleEmailChange(event) {
    this.address1 = event.currentTarget.value;
   
  }

  handleStateChange(event) {
    this.selectedState = event.target.value;

  }
  handleAddress1Change(event) {
    this.address1 = event.currentTarget.value;
   
  }
  handleAddress2Change(event) {
    this.address2 = event.currentTarget.value;
    if(event.currentTarget.value == '' || event.currentTarget.value ==null){
      event.currentTarget.setCustomValidity("Please select Consents!");
      // consentreq.setCustomValidity("");
      event.currentTarget.reportValidity();
     // this.fireErrorToast();
    }else{
      event.currentTarget.setCustomValidity("");
      event.currentTarget.reportValidity();
    }
  }

  handleCityChange(event) {
    this.city = event.currentTarget.value;
    if(event.currentTarget.value == '' || event.currentTarget.value ==null){
      event.currentTarget.setCustomValidity("Please select Consents!");
      // consentreq.setCustomValidity("");
      event.currentTarget.reportValidity();
     // this.fireErrorToast();
    }else{
      event.currentTarget.setCustomValidity("");
      event.currentTarget.reportValidity();
    }
  }

  /*handlePhoneNumberChange(event) {
    this.phoneNumber = event.currentTarget.value;
  }*/

  handleZipcodeChange(event) {
    this.zipcode = event.currentTarget.value;
    console.log('ssssssssss ', event.currentTarget.value);
    if(event.currentTarget.value == '' || event.currentTarget.value ==null){
      event.currentTarget.setCustomValidity("Please select Consents!");
      // consentreq.setCustomValidity("");
      event.currentTarget.reportValidity();
     // this.fireErrorToast();
    }else{
      event.currentTarget.setCustomValidity("");
      event.currentTarget.reportValidity();
    }
  }
  handleShipmentConsentChange(event) {
    
   this.input_shipmentconsent = JSON.parse(JSON.stringify(event.detail.value)).join(';');
   console.log('dddd=', this.input_shipmentconsent);

   if (this.input_shipmentconsent) {
    console.log("shipment consent is--", this.input_shipmentconsent);
    let consentreq = this.template.querySelector('.consentrequired');
    //consentreq.setCustomValidity("Please select the Consent!");
     consentreq.setCustomValidity("");
    consentreq.reportValidity();

   }else{
    let consentreq = this.template.querySelector('.consentrequired');
    consentreq.setCustomValidity("Please select the Consent!");
    consentreq.reportValidity();
   }


   
  }
  handleShipmentConsentChange2(event) {
    
   this.input_shipmentconsent1 = JSON.parse(JSON.stringify(event.detail.value)).join(';');
   console.log('dddd=', this.input_shipmentconsent1);

   if (this.input_shipmentconsent1) {
    console.log("shipment consent is--", this.input_shipmentconsent1);
    let consentreq = this.template.querySelector('.consentrequired1');
    //consentreq.setCustomValidity("Please select the Consent!");
     consentreq.setCustomValidity("");
    consentreq.reportValidity();

   }else{
    let consentreq = this.template.querySelector('.consentrequired1');
    consentreq.setCustomValidity("Please select the Consent!");
    consentreq.reportValidity();
   }


   
  }

  
  // function to call USPS API and validate address.
  validateAddress() {
    console.log("i am in validate address method");
    
    console.log('this.address1 first===>', this.address1);
    console.log('city===>', this.city);
   
    
    if(this.zipcode!=null && this.zipcode.length>=9){
      var zipsplit = this.zipcode.split('-');
      this.zip5 = zipsplit[0];
      this.zip4 = zipsplit[1];
      console.log('this.zip4===>',this.zip4);
    }
    if(this.zipcode!=null && this.zipcode.length==5){
      this.zip5 = this.zipcode;
      console.log('this.zip5===>',this.zip5);
    }
    
    console.log('this.address1===>', this.address1);
    CheckAddress({
      Address1: this.address1,
      Address2: this.address2,
      City: this.city,
      State: this.selectedState,
      Zip5: this.zip5,
      Zip4:this.zip4
    })
      .then((result) => {
        console.log("----results are---", result);

        if (result) {
          console.log("response is----", JSON.stringify(result));

          if (result.USPS_ERROR_CODE == "") {
            // if(this.address1== "NULL")
            // this.address1= ' ';
            // else{
              console.log("#---value of new address1--", result.Address1);
              if(result.Address1!='NULL'){
                this.address1 = result.Address1;
              }
              if(result.Address1=='NULL'){
                this.address1 = '';
              }
           // }
            
            this.address2 = result.Address2+' '+this.address1;
            //this.address2 = result.Address2;
            console.log("---value of new address2--", this.address2);
            this.city = result.City;
            console.log("---value of newcity--", this.city);
            this.selectedState = result.State;
            console.log("---value of new state--", this.selectedState);
            console.log("---value Zip4--", this.zip4);
            if(this.zip4!=null){
              this.zipcode = result.Zip5+'-'+ result.Zip4;

            }
            if(this.zip4==null){
              this.zipcode = result.Zip5;
            }

            this.showText = true;
            
            let inputTextAddress = this.template.querySelector("[data-id='inputTextAddress']");
            let inputTextCity = this.template.querySelector("[data-id='inputTextCity']");
            let inputTextZipcode = this.template.querySelector("[data-id='inputTextZipcode']");
            let inputTextCountry = this.template.querySelector("[data-id='inputTextCountry']");
            let inputTextState = this.template.querySelector("[data-id='inputTextState']");
            let inputTextPhone = this.template.querySelector("[data-id='inputTextPhone']");
            console.log("inputTextPhone>>>>"+inputTextPhone);
            if(this.showText == true){
              
              console.log('showText>>>>>>> is true');
              inputTextAddress.disabled = true;
              inputTextCity.disabled = true;
              inputTextZipcode.disabled = true;
              inputTextCountry.disabled = true;
              inputTextState.disabled = true;
              if(inputTextPhone!=null && inputTextPhone!='undefined'){
                inputTextPhone.disabled = true;
              }
              
            }else{
              console.log('showText>>>>>>> is false');
              inputTextAddress.disabled = false;
              inputTextCity.disabled = false;
              inputTextZipcode.disabled = false;
              inputTextCountry.disabled = false;
              inputTextState.disabled = false;
              inputTextPhone.disabled = false;
            }
            //selectedState = false;
            //this.responseAddress = JSON.stringify(result) + 'sssssssssssssssssssssssss';


            
            
            
          } else this.showText = false;
          
          //this.responseAddress = result.USPS_ERROR_DESC;
          console.log('Second respose',result.USPS_ERROR_DESC);
         

          if(result.USPS_ERROR_DESC.trim() == "Invalid State Code."){
            this.responseAddress = this.DBS_text_11;
          }
          
          if(result.USPS_ERROR_DESC.trim() == 'Invalid City.'){
            console.log('Second response2',result.USPS_ERROR_DESC);
            this.responseAddress = this.DBS_text_12;
          }
          if(result.USPS_ERROR_DESC.trim() == "Address Not Found."){
            this.responseAddress = this.DBS_text_13;
          }
          if(result.USPS_ERROR_DESC.trim() == "Address Verified."){
            this.responseAddress = this.DBS_text_14;
          }
          
        } else {
          console.log("Fields NOT updated", result);
        } 
      }) 
      .catch((error) => {
        console.log("error: ", error);
      }); 

  }

  decline(event) {
    //window.location.href="https://blog.mindcrowd.org/";
    if (window.location.pathname.indexOf('vip') > -1) {
      this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
          url: community_url + '/s/' + url_decline_vip
        }
      },
      true); // Replaces the current page in your browser history with the URL
    } else {
      window.location.href = url_decline;
      console.log('gggg', url_decline);
    }
  }
  
  updateContactFields(event) {
    if(this.zipcode!=null){
      if(this.zipcode.length>=9){
        var zipsplit = this.zipcode.split('-');
        this.zip5 = zipsplit[0];
        this.zip4 = zipsplit[1];
        console.log('this.zip4===>',this.zip4);
      }
      if(this.zipcode.length=='5'){
        this.zip5 = this.zipcode;
        console.log('this.zip5===>',this.zip5);
      }
    }
    
    
    let mailingstreet = this.address2;
    console.log("IN updatecontactfields", this.participantcode);
    console.log('shipment consent after clicking I consent button',this.input_shipmentconsent);
    console.log(this.address1);
    console.log(this.address2);
    
    

    

    const isInputsCorrect2 = [
      ...this.template.querySelectorAll(".consentrequired1")
    ].reduce((validSoFar, inputField) => {
     
      //let consentreq2 = inputField);
      console.log("inputField>>>>"+inputField);
      if(inputField.value == '' || inputField.value ==null){
        console.log('ddddddddddd', inputField.value);
        inputField.setCustomValidity("Please select Consents!");
        // consentreq.setCustomValidity("");
        inputField.reportValidity();
        this.fireErrorToast();
      }else{
        console.log('ddddddddddd2', inputField.value);
        inputField.setCustomValidity("");
        inputField.reportValidity();
      }
      //inputField.reportValidity();
      return validSoFar && inputField.checkValidity();
    }, true);

    const isInputsCorrect = [
      ...this.template.querySelectorAll("lightning-input, lightning-combobox")
    ].reduce((validSoFar, inputField) => {
      console.log('ddddddddddd', inputField.value);
      // if(inputField.value == false){inputField.value = ' '}
      inputField.reportValidity();
      return validSoFar && inputField.checkValidity();
      
    }, true);
    
    // if(this.template.querySelector('.StateCombo').value)
      if (this.input_shipmentconsent == '' || this.input_shipmentconsent == null) 
      {
        console.log("value of shipment consent", this.input_shipmentconsent);
        let consentreq = this.template.querySelector('.consentrequired');
        consentreq.setCustomValidity("Please select Consents!");
        // consentreq.setCustomValidity("");
        consentreq.reportValidity();
        this.fireErrorToast();
      }else if (this.input_shipmentconsent1 == '' || this.input_shipmentconsent1 == null) {
        console.log("value of shipment consent", this.input_shipmentconsent1);
        let consentreq = this.template.querySelector('.consentrequired1');
        consentreq.setCustomValidity("Please select Consents!");
        // consentreq.setCustomValidity("");
        consentreq.reportValidity();
        this.fireErrorToast();
      }else
     {
        // if (this.input_shipmentconsent.includes("decline") && this.input_shipmentconsent.includes("consent"))
        console.log('Test shipment value>>',this.input_shipmentconsent);
        console.log('this.input_shipmentconsent.includes("consent")' , this.input_shipmentconsent.includes("consent"));
        if (this.input_shipmentconsent.includes("consent") && this.input_shipmentconsent1.includes("consent"))
        {
            // console.log('---select all values--must include both values');
            // shippingconsent.setCustomValidity("Please select both the Consents!");
              console.log('isInputsCorrect2=', isInputsCorrect2, ' isInputsCorrect = ',isInputsCorrect);
              console.log('shipping consent value---------------------->');
              if (isInputsCorrect && isInputsCorrect2) {
                console.log('shipping consent value--5555555555555555555-------------------->');
                console.log('shipping consent value>>>>',this.input_shipmentconsent);
                console.log('shipping consent value--5555555555555555555-------------------->',isInputsCorrect);
                console.log('shipping consent value 1--5555555555555555555---mailingstreet----------------->',this.participantcode,mailingstreet,this.input_shipmentconsent,this.campaign);
                this.isLoading = true;
                event.target.disabled = true;
                console.log('phoneNumber>>>>'+this.phoneNumber);
                console.log('participantcode:'+ this.participantcode,
                'mailingstreet:'+ mailingstreet,
                'mailingcountry:'+ this.selectedCountry,
                'mailingstate:'+ this.selectedState,
                'mailingcity:'+ this.city,
                'mailingzipcode5:'+ this.zip5,
                'mailingzipcode4:'+ this.zip4,
                'phoneNumber:'+ this.phoneNumber,
                'shipmentconsent:'+ this.input_shipmentconsent,
                'campaigntype:'+this.campaign,
                'FirstName:'+this.firstName,
                'LastName:'+this.lastName);
                if(this.selectedState == false){this.selectedState = ' '}
                updateContactFields({
                  participantcode: this.participantcode,
                  mailingstreet: mailingstreet,
                  mailingcountry: this.selectedCountry,
                  mailingstate: this.selectedState,
                  mailingcity: this.city,
                  mailingzipcode5: this.zip5,
                  mailingzipcode4: this.zip4,
                  phoneNumber: this.phoneNumber,
                  shipmentconsent: this.input_shipmentconsent,
                  campaigntype:this.campaign,
                  vipbeangame: this.vipbeangame,
                  firstName: this.firstName,
                  lastName: this.lastName
                }).then((result) => {
                  
                    this.isLoading = false;
                    console.log("result is----", result);
                    if (result=='success') {
                      // this.fireSuccessToast();
                      this.accept();
                    }
                    else if(result=='DuplicateSD'){
                      this.alreadysubmitted();
                    }                    
                    else {
                      console.log("Fields NOT updated", result);
                      
                    }
                  }) //then close
                  .catch((error) => {
                    event.target.disabled = false;
                    this.isLoading = false;
                    console.log("error: ", error);
                });
              } 
              else {
                console.log("error:------------- ");
                this.isLoading = false;
                this.fireErrorToast();
              }
        }
        else{
          console.log('Please select all consent.');
          let consentreq = this.template.querySelector('.consentrequired');
          consentreq.setCustomValidity("Please select the Consent!");

          let consentreq1 = this.template.querySelector('.consentrequired1');
          consentreq1.setCustomValidity("Please select the Consent!");

          // consentreq.setCustomValidity("");
          consentreq.reportValidity();
          consentreq1.reportValidity();
          this.fireErrorToast();
        }
     }
    // shippingconsent.reportValidity();
  }

  disconnectedCallback() {
    this.isLoading = false;
  }
  //Function which runs when participant clicks on I agree.
  accept() {
    this[NavigationMixin.Navigate](
      {
        type: "standard__webPage",
        attributes: {
          url: community_url+"/s/"+this.url_acceptance
        }
      },
      true // Replaces the current page in your browser history with the URL
    );
  }

  alreadysubmitted() {
    this[NavigationMixin.Navigate](
      {
        type: "standard__webPage",
        attributes: {
          url: community_url+"/s/"+this.url_alreadysubmitted
        }
      },
      true // Replaces the current page in your browser history with the URL
    );
  }
  
  fireErrorToast() {
    //console.log('ssssssssssssssss');
    this.ErrorModalOpen = true;
      //  document.querySelector("body").style.overflow = 'hidden';

    // const evt = new ShowToastEvent({
    //   message: "Please Enter Required Fields",
    //   variant: "error"
    // });
    // this.dispatchEvent(evt);
  }
  closeModal() {
    //this.isModalOpen = false;
    this.ErrorModalOpen = false;
   // this.isSubmitBtnDisable = false;

}


}