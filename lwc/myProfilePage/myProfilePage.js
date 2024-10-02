import { api, LightningElement, track, wire } from "lwc";

import {
  getObjectInfo,
  getPicklistValues,
  getPicklistValuesByRecordType
} from "lightning/uiObjectInfoApi";
import { CurrentPageReference } from "lightning/navigation";
import getContact from "@salesforce/apex/CustomLoginController.getCurrentUser";
import getCurrentContact from "@salesforce/apex/CustomLoginController.getCurrentContact";
import conBiologicalSex from "@salesforce/schema/Contact.Sex__c";
import CONTACT_HEALTH from "@salesforce/schema/Contact.Health_Lifestyle_and_Medical__c";
import CONTACT_LANGUAGE from "@salesforce/schema/Contact.Most_fluent_language__c";
//import getContactData from '@salesforce/apex/CustomLoginController.getContactData';
//import updateContactData from '@salesforce/apex/CustomLoginController.updateContactData';
//import insertCon from '@salesforce/apex/CustomLoginController.insertCon';
import upsertContact from "@salesforce/apex/CustomLoginController.upsertContact1";
import CONTACT_FIRSTDEGREE from "@salesforce/schema/Contact.First_degree_family_history_of_AD__c";
import CONTACT_FIRSTDEGREE_EO from "@salesforce/schema/Contact.First_degree_family_history_of_EO_AD__c";
import CONTACT_SECONDDEGREE from "@salesforce/schema/Contact.Second_degree_family_history_of_AD__c";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import changePassword from "@salesforce/apex/CustomLoginController.changePassword";
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import brainInfo_text_2 from "@salesforce/label/c.brainInfo_text_2";
import complete6 from "@salesforce/label/c.complete6";
import complete7 from "@salesforce/label/c.complete7";
import complete8 from "@salesforce/label/c.complete8";
import complete9 from "@salesforce/label/c.complete9";
import conGender from "@salesforce/schema/Contact.Gender__c";
import brainInfo_text_14 from "@salesforce/label/c.brainInfo_text_14";
import brainInfo_text_4 from "@salesforce/label/c.brainInfo_text_4";
import brainInfo_text_9 from "@salesforce/label/c.brainInfo_text_9";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import { refreshApex } from "@salesforce/apex";

import MAILINGCITY_FIELD from "@salesforce/schema/Contact.MailingCity";
import MAILINGCOUNTRY_FIELD from "@salesforce/schema/Contact.MailingCountryCode";
import conEducation from "@salesforce/schema/Contact.Highest_level_of_education_completed__c";
import CONTACT_MEDICATIONS from "@salesforce/schema/Contact.Number_of_daily_medications__c";
import conSpeakLanguages from "@salesforce/schema/Contact.Number_of_fluent_languages_spoken__c";
import conWriteLanguages from "@salesforce/schema/Contact.Number_of_fluent_languages_written__c";
import conFluentLanguage from "@salesforce/schema/Contact.Most_fluent_language__c";
import brainInfo_text_5 from "@salesforce/label/c.brainInfo_text_5";
import brainInfo_text_6 from "@salesforce/label/c.brainInfo_text_6";
import brainInfo_text_7 from "@salesforce/label/c.brainInfo_text_7";
import brainInfo_text_10 from "@salesforce/label/c.brainInfo_text_10";
import finish_text_6 from "@salesforce/label/c.finish_text_6";
import finish_text_9 from "@salesforce/label/c.finish_text_9";
import myprofile_text_03 from "@salesforce/label/c.myprofile_text_03";
import myprofile_text_10 from "@salesforce/label/c.myprofile_text_10";
import myprofile_text_12 from "@salesforce/label/c.myprofile_text_12";
import chngePassword from "@salesforce/label/c.chngePassword";
import oldPassword from "@salesforce/label/c.oldPassword";
import newPassword from "@salesforce/label/c.newPassword";
import confirmPassword from "@salesforce/label/c.confirmPassword";
import rule from "@salesforce/label/c.rule";
import rule_1 from "@salesforce/label/c.rule_1";
import rule_2 from "@salesforce/label/c.rule_2";
import maillingAddress from "@salesforce/label/c.maillingAddress";
import state_text from "@salesforce/label/c.state_text";
import city_text from "@salesforce/label/c.city_text";
import address_text from "@salesforce/label/c.address_text";
import zip_text from "@salesforce/label/c.zip_text";
import cancel_text from "@salesforce/label/c.cancel_text";
import close_text from "@salesforce/label/c.close_text";
import myprofile_text_13 from "@salesforce/label/c.myprofile_text_13";
import close_btn from "@salesforce/label/c.close_btn";
//import documentTitle from "@salesforce/label/c.documentTitle";
//import documentDiscription from "@salesforce/label/c.documentDiscription";

const fields = [MAILINGCITY_FIELD, MAILINGCOUNTRY_FIELD];
export default class MyProfilePage extends LightningElement {
  @api recordId;

  label = {
    brainInfo_text_2,
    complete7,
    complete8,
    complete9,
    brainInfo_text_4,
    brainInfo_text_14,
    brainInfo_text_5,
    brainInfo_text_6,
    brainInfo_text_7,
    brainInfo_text_10,
    finish_text_6,
    finish_text_9,
    myprofile_text_03,
    myprofile_text_10,
    complete6,
    brainInfo_text_9,
    myprofile_text_12,
    chngePassword,
    oldPassword,
    newPassword,
    confirmPassword,
    rule,
    rule_1,
    rule_2,
    maillingAddress,
    state_text,
    city_text,
    zip_text,
    address_text,
    cancel_text,
    close_text,
    myprofile_text_13,
    close_btn

  };
  @track rec = CONTACT_OBJECT;
  @track pass;
  @track contactId;
  @track error;
  @track data;
  @track openModal = false;
  @track oldPassword;
  @track confirmNewPassword;
  @track newPassword;
  inp_newPassword;
  @track isEmpty = false;
  @track error;
  @track openRelated = false;
  isSecondLanguageAgeVisible = false;
  input_health;
  @track input_firstdegreeeo;
  @track input_seconddegree;
  @track isFirstDegreeEOVisible = false;
  @track selectedmedicalConditions = [];
  @track ErrorModalOpenAge = false;
  speakingLanguageAgeFind = false;
  // @track selectedmedicalConditions = [];

  @track selectedmedicalConditions1 = [];
  @track healthOptions = [{ label: "none", value: "" }];
  @track languOptions = [{ label: "none", value: "" }];
  // @track city = "";
  // @track address1 ="";
  // @track zipcode ="";
  isStateVisible = true;
  @track dependentValues = [];
  controlValues;
  totalDependentValues = [];
  input_medications;
  @track ErrorModalOpen = false;
  mNewPasswordError = false;
  mNewConfirmPasswordError = false;
  mOldPasswordError = false;
  mPwdMatch = false;
  mPwdRequirment = false;
  mNewPasswordLength = false;
  requiredFieldError1 = "";
  requiredFieldError2 = "";
  requiredFieldError3 = "";
  pwdMatchError2 = "";
  pwdMatchError3 = "";
  mNewPasswordLengthCheck = "";
  @track ProfileUpdateModal = false;
  mEmailError = false;
  emailrequire = "";
  @api My_Profile = "My Profile";
  @api change_password = "Change Password";
  @api finish_text_6 = "First Name";
  @api finish_text_9 = "Last Name";
  @api myprofile_text_03 = "Email";
  @api myprofile_text_13 = "Phone";
  @api maillingAddress = "Please Enter your mailing Address:";
  @api address_text = "Address:";
  @api city_text = "City";
  @api zip_text = "zip text";
  @api complete6 = "	Which of the following have you personally experienced or are you currently experiencing?";
  @api complete7 = "	Has one of your siblings or one of your parents been diagnosed with Alzheimer’s disease?";
  @api complete8 = "Was your sibling or parent diagnosed with Alzheimer's disease before the age of 55?";
  @api complete9 = "	Do you have any second-degree relatives (grandparents, grandchildren, aunts, uncles, nephews, nieces, or half-siblings) that have been diagnosed with Alzheimer’s disease?";
  @api brainInfo_text_4 = "What gender do you identify as?";
  @api brainInfo_text_14 = "Please tell us what gender you identify as";
  @api brainInfo_text_5 = "What is the highest level of education you've completed?";
  @api brainInfo_text_6 = "How many languages do you speak fluently?";
  @api brainInfo_text_7 = "How many languages do you write fluently?";
  @api brainInfo_text_9 = "If you speak a second language, at what age did you begin speaking that language?";
  @api brainInfo_text_10 = "In what language are you most fluent?";
  @api brainInfo_text_11="If you speak a second language, at what age did you begin speaking that language?";
  @api myprofile_text_12 = "How many prescription medications do you take on a daily basis?Number of daily medications";
  @api chngePassword = "Change Password";
  @api rule = "You must adhere to the following password rules:";
  @api rule_1 = "	* Your password must be at least 8 characters long.";
  @api rule_2 = "	* Your password must include letters and numbers";
  @api new_c_Password = "	New Password:";
  @api confirm_c_Password = "Confirm New Password:";
  @api old_c_Password = "Old Password:";
  @api newPassword;
  @api confirmPassword;
  @api oldPassword;
  @api cancel_text = "cancel";
  @api reuiredField = "Please fill out the fields marked with an asterisk.";
  @api profileUpdated = "Profile Updated Successfully!";
  @api validation_mandatory = "Please fill out the fields marked with an asterisk.";
  @api age_validation = "Please enter age from 18 to 115."
  @api brainInfo_text_choose="Please Choose";
  @api password_validation  = "Please enter a strong password";
  @api state_text = "State";
  @api myprofile_text_10 = "In what country do you currently live?";
  @api save = "save";
  @api documentTitle = "Profile • MC Expanded";
  @api documentDiscription = "Profile • MindCrowd Project Expanded";
  @api discription_p_text = "Suite/APT No.";
  @api city_p_text = "City";
  @api zipCode_p_text = "ZIP Code";
  @api None = "--None--";
  @api required1 = "Please Enter New Password.";
  @api required2 = "New Password must be at least 8 characters long.";
  @api required3 = "New Password didn't contains alphanumeric charecters.";
  @api required4 = "Please Enter Confirm Password.";
  @api required5 = "Please Enter Old Password.";
  @api required6 = "Passwords do not match.";
  @api required7 = "Password Updated Successfully.";
  @api required8 = "Old Password didn't match.";
  @api Success = "Success!";
  @api Error = "Error!";



  // Contact object info
  @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
  objectInfo;
  ///-----poc for address-----
  @wire(getRecord, { recordId: "$recordId", fields })
  contact;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: conBiologicalSex
  })
  biologicalSex;
  @wire(getPicklistValues, {


    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: conEducation
  })
  education;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: CONTACT_MEDICATIONS
  })
  medications;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: conSpeakLanguages
  })
  speakLanguages;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: conWriteLanguages
  })
  writeLanguages;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: conFluentLanguage
  })
  fluentLanguage;
  @wire(getPicklistValuesByRecordType, {
    objectApiName: CONTACT_OBJECT,
    recordTypeId: "$objectInfo.data.defaultRecordTypeId"
  })
  countryPicklistValues({ error, data }) {
    if (data) {
      this.error = null;
      let countyOptions = [{ label: "United States", value: "US" }];
      // Account Country Control Field Picklist values
      data.picklistFieldValues.MailingCountryCode.values.forEach((key) => {
        countyOptions.push({
          label: key.label,
          value: key.value
        });
      });

      this.controllingValues = countyOptions;
      let stateOptions = [{ label: this.None, value: this.None}];
      //console.log('state option',stateOptions);

      // contact State Control Field Picklist values
      this.controlValues = data.picklistFieldValues.MailingStateCode.controllerValues;
      // contact State dependent Field Picklist values
      this.totalDependentValues =
        data.picklistFieldValues.MailingStateCode.values;
      this.totalDependentValues.forEach((key) => {
        stateOptions.push({
          label: key.label,
          value: key.value
        });
      });

      this.dependentValues = stateOptions;
      //console.log('wire countryPicklistValues');
          this.isEmpty = false;
          let dependValues = [];

          if (this.selectedCountry) {
            // if Selected country is none returns nothing
            if (this.selectedCountry === "--None--") {
              this.isEmpty = true;
              dependValues = [{ label: this.None, value:this.None }];
              this.selectedCountry = null;
              this.selectedState = null;
              return;
            }
            // else if (this.selectedCountry == "US") {
            //   this.isStateVisible = true;
            //} else {
            //   this.isStateVisible = true;
            //   this.showText = false;
            // }
    
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
            //console.log('countryPicklist Dependent Values', JSON.stringify(this.dependentValues));
          }
      
    } else if (error) {
      this.error = JSON.stringify(error);
      console.log(this.error);
    }
  }

  handleCountryChange(event) {
    // Selected Country Value
    this.selectedCountry = event.target.value;
    this.isEmpty = false;
    let dependValues = [];

    if (this.selectedCountry) {
      // if Selected country is none returns nothing
      if (this.selectedCountry === "--None--") {
        this.isEmpty = true;
        dependValues = [{ label: this.None, value:this.None }];
        this.selectedCountry = null;
        this.selectedState = null;
        return;
      } 
      // else if (this.selectedCountry == "US") {
      //   this.isStateVisible = true;
      // } else {
      //   this.isStateVisible = true;
      //   this.showText = false;
      // }

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
    }
  }
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: CONTACT_HEALTH
  })
  wiredHealthValues({ data, error }) {
    if (data) {
      this.healthOptions = JSON.parse(JSON.stringify(data.values));
    }
    if (error) {
      console.log("error ", error);
    }
  }

  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: conGender
  })
  gender;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: CONTACT_LANGUAGE
  })
  wiredlangValues1({ data, error }) {
    if (data) {
      this.languOptions = JSON.parse(JSON.stringify(data.values));
    }
    if (error) {
      console.log("error ", error);
    }
  }
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: CONTACT_FIRSTDEGREE
  })
  firstdegree;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: CONTACT_FIRSTDEGREE_EO
  })
  firstdegreeeo;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: CONTACT_SECONDDEGREE
  })
  seconddegree;

  handleGender(event) {
    this.rec.Gender__c = event.target.value;
  }

  inputValue = "";
  inputPhoneValue = "";

  setPhoneType(event) {
    this.inputPhoneValue = event.target.value;
    // alert('test = ' + this.inputPhoneValue + '----' + event.keyCode);
    if (event.keyCode != 8) {
      if (!/^[0-9]+$/.test(this.inputPhoneValue )) {
        event.target.value = this.inputPhoneValue.slice(0, -1);
      }
    }
    if (this.inputPhoneValue.length > 10) {
      event.target.value = this.inputPhoneValue.substring(0, 10);
    }
    this.rec.Phone = event.target.value;
  }

  handleAge(event) {
    this.rec.Age_at_second_spoken_language__c = event.target.value;
    let age = this.template.querySelector('.age');
    let value2 = this.rec.Age_at_second_spoken_language__c;
    if (!/^[0-9]+$/.test(value2)) {
      age.setCustomValidity("");
    } else {
      age.setCustomValidity("");
    }
  }

  get renderOptionalField() {
    return this.rec.Gender__c === "Not Listed (Free Text Field)" ? true : false;
  }
  get renderFirstDegreeField() {
    return this.rec.First_degree_family_history_of_AD__c === "Yes"
      ? true
      : false;
  }
  handleChangeFieldeducation(event) {
    this.rec.Highest_level_of_education_completed__c = event.target.value;
  }
  handleMedications(event) {
    this.rec.Number_of_daily_medications__c = event.target.value;
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
  }
  handleChangeFieldwriteLanguages(event) {
    this.rec.Number_of_fluent_languages_written__c = event.target.value;
  }
  handleChangeFieldfluentLanguage(event) {
    this.rec.Most_fluent_language__c = event.target.value;
  }
  handleEmail(event) {
    this.rec.Email = event.target.value;
  }
  handlePhone(event) {
    this.rec.Phone = event.target.value;
  }
  handleFirstName(event) {
    this.rec.FirstName = event.target.value;
  }
  handleLastName(event) {
    this.rec.LastName = event.target.value;
  }
  handleStateChange(event) {
    this.rec.MailingStateCode = event.target.value;
    this.selectedState = this.rec.MailingStateCode;
    // this.selectedState = event.target.value;
  }
  handleAddress1Change(event){
   this.rec.MailingStreet=event.target.value.replace(/\n/g, ' ');
   this.address1 = this.rec.MailingStreet;
  }


  handleCityChange(event) {
    this.rec.MailingCity = event.target.value;
    this.city =  this.rec.MailingCity;
  }

  handleZipcodeChange(event) {
    this.rec.MailingPostalCode = event.target.value;
    let zipcode = this.template.querySelector('.zipcode');
    let value4 = this.rec.MailingPostalCode;
    if (!/^[0-9]+$/.test(value4)) {
        zipcode.value="";
        this.rec.MailingPostalCode="";
        zipcode.setCustomValidity("");
    } 
    else {
        zipcode.setCustomValidity("");
       
    }
    this.zipcode = this.rec.MailingPostalCode;
  }
  handleOtherGender(event) {
    this.rec.Other_Gender__c = event.target.value;
  }

  handleBiologicalSex(event) {
    this.rec.Sex__c = event.target.value;
  }
  medicalConditionsChange(event) {
    this.input_health = event.detail.value;
    if (this.input_health == '') {
      this.selectedmedicalConditions = this.input_health;
  }
    for (let i = 0; i < event.detail.value.length; i++) {
      if (this.input_health[i] == "None of these Conditions Apply to Me") {
        this.selectedmedicalConditions = this.input_health[i];
        this.input_health = this.selectedmedicalConditions;
      } else if (
        this.input_health.length == 2 &&
        this.input_health[this.input_health.length - 1] ==
        "None of these Conditions Apply to Me"
      ) {
        //console.log("Check ==length== =", this.input_health, this.selectedmedicalConditions, this.input_health[i]);
        if (this.selectedmedicalConditions != "None of these Conditions Apply to Me") {
          this.selectedmedicalConditions = "None of these Conditions Apply to Me";
          this.input_health = this.selectedmedicalConditions;
        } else {
          this.selectedmedicalConditions = this.input_health[i];
          this.input_health = this.selectedmedicalConditions;
        }
        //console.log("Check =2=== =", this.input_health, this.selectedmedicalConditions.length);
      }
      //console.log("Check box is  end checked =", this.input_health);
      this.rec.Health_Lifestyle_and_Medical__c = this.input_health;
    }
    // this.input_health = JSON.parse(JSON.stringify(this.input_health)).join(';');
    // this.rec.Health_Lifestyle_and_Medical__c= this.input_health;
  }

  handleChangeFieldfluentLanguage(event) {
    this.rec.Most_fluent_language__c = event.target.value;
  }

  handleFirstDegree(event) {
    this.rec.First_degree_family_history_of_AD__c = event.target.value;
    if (event.target.value === "Yes") {
      this.isFirstDegreeEOVisible = true;
    } else {
      this.isFirstDegreeEOVisible = false;
    }
  }
  handleFirstDegreeEO(event) {
    this.rec.First_degree_family_history_of_EO_AD__c = event.target.value;
  }
  handleSecondDegree(event) {
    this.rec.Second_degree_family_history_of_AD__c = event.target.value;
  }

  connectedCallback() {
    getContact()
      .then((result) => {
        //window.console.log("result ===> ", result);
        this.data = result;
        this.contactId = this.data.ContactId;
        this.getCurrentContactdetails();
        //console.log('get curretncontact run---',this.getCurrentContact);
      })
      .catch((error) => {
        console.log("error");
        this.error = error;
        console.log("error", this.error);
      });
    document.title = this.documentTitle;
    // document.head.innerHTML +=  '<meta name="description" content="Profile • MindCrowd Project Expanded">';
    var meta = document.createElement("meta");
    meta.setAttribute("name", "robots");
    meta.setAttribute("content", "noindex, nofollow");
    document.getElementsByTagName("head")[0].appendChild(meta);
    meta.setAttribute("name", "description");
    meta.setAttribute("content", this.documentDiscription);
    document.getElementsByTagName("head")[0].appendChild(meta);
  }
  //This function is getting current contact details.
  getCurrentContactdetails() {
    getCurrentContact({ contactId: this.contactId })
      .then((result) => {
        if (result) {
         // console.log('ddddddddddd');
          this.city = result.MailingCity;
          this.selectedCountry = result.MailingCountryCode;
          this.isEmpty = false;
          let dependValues = [];
          //console.log('getCurrentContactdetails');
          if (this.selectedCountry) {
            // if Selected country is none returns nothing
            if (this.selectedCountry === "--None--") {
              this.isEmpty = true;
              dependValues = [{ label: this.None, value:this.None }];
              this.selectedCountry = null;
              this.selectedState = null;
              return;
            }
            // else if (this.selectedCountry == "US") {
            //   this.isStateVisible = true;
            //} else {
            //   this.isStateVisible = true;
            //   this.showText = false;
            // }
    
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
            //console.log('connectedCallback Dependent Values', JSON.stringify(this.dependentValues));
          }
          this.selectedState = result.MailingStateCode;
          this.address1 = result.MailingStreet;
          this.zipcode = result.MailingPostalCode;
          // console.log(result.Health_Lifestyle_and_Medical__c);
          if (result.Health_Lifestyle_and_Medical__c !== undefined)
            this.selectedmedicalConditions =
              result.Health_Lifestyle_and_Medical__c;
          this.rec.Sex__c = result.Sex__c;
          this.rec.First_degree_family_history_of_AD__c =
            result.First_degree_family_history_of_AD__c;
          this.rec.First_degree_family_history_of_EO_AD__c =
            result.First_degree_family_history_of_EO_AD__c;
          this.rec.Second_degree_family_history_of_AD__c =
            result.Second_degree_family_history_of_AD__c;
          this.rec.Highest_level_of_education_completed__c =
            result.Highest_level_of_education_completed__c;
          this.rec.Email = result.Email;
          this.rec.Phone = result.Phone;
          this.rec.Number_of_daily_medications__c =
            result.Number_of_daily_medications__c;
          this.rec.Most_fluent_language__c = result.Most_fluent_language__c;
          this.rec.Number_of_fluent_languages_spoken__c =
            result.Number_of_fluent_languages_spoken__c;
          this.rec.Number_of_fluent_languages_written__c =
            result.Number_of_fluent_languages_written__c;
          this.rec.Gender__c = result.Gender__c;
          this.rec.LastName = result.LastName;
          this.rec.FirstName = result.FirstName;
         
        //  if (this.rec.MailingCountryCode == "US") this.isStateVisible = true;
        //  else this.isStateVisible = false;
          if(result.Number_of_fluent_languages_spoken__c >1){
            this.isSecondLanguageAgeVisible = true;
            this.rec.Age_at_second_spoken_language__c= result.Age_at_second_spoken_language__c;
          }
          else{
            this.isSecondLanguageAgeVisible = false;
          }
        } else {
          //console.log("Fields NOT updated", result);
        }
       
      })
      .catch((error) => {
        console.log("error: ", error);
      });
     
  }

  closeModal() {
    this.openModal = false;
    this.newPassword='';
    this.oldPassword='';
    this.confirmNewPassword=''; 
  }
  onChangePasswordClick() {
    this.openModal = true;
  }
  closeModal1() {
    this.ErrorModalOpen = false;
   
  }
  closeModal2() {
    this.ProfileUpdateModal = false;
    window.location.reload();
  }
  closeModal3() {
    this.hasRequiredFieldError = false;
  }

  onChangeNewPwd(event) {
    this.newPassword = event.target.value;
  }
  onChangeConfirmPwd(event) {
    this.confirmNewPassword = event.target.value;
  }
  onChangeOldPwd(event) {
    this.oldPassword = event.target.value;
  }
  clickChange(event) {
    let hasError = false;
    let newPwdElm = this.template.querySelector(".newPassword");
    let confirmPwdElm = this.template.querySelector(".confirmPassword");
    let oldPwdElm = this.template.querySelector(".oldPassword");

    if (!this.newPassword) {
      hasError = true;
      newPwdElm.setCustomValidity("required");
      this.mNewPasswordError = true;
      this.requiredFieldError1 = this.required1;
    } else {
            if ((this.newPassword).length<8 && this.newPassword!='' && this.newPassword!=null  ) {
              hasError = true;
              this.mNewPasswordLength = true;
              newPwdElm.setCustomValidity("required");
              this.mNewPasswordLengthCheck = this.required2;
            }else {
                  if ( !/^(?=.*[a-zA-Z])(?=.*[0-9]){8}/.test(this.newPassword) && this.newPassword!='' && this.newPassword!=null) {
                    hasError = true;
                    this.mPwdRequirment = true;
                    newPwdElm.setCustomValidity("required");
                    this.pwdMatchError3 = this.required3;
                  }else {
                    newPwdElm.setCustomValidity("");
                    this.pwdMatchError3 = "";
                    this.mPwdRequirment = false;
                  }
                  newPwdElm.reportValidity();
              newPwdElm.setCustomValidity("");
              this.mNewPasswordLengthCheck = "";
              this.mNewPasswordLength = false;
            }
            newPwdElm.reportValidity();
      newPwdElm.setCustomValidity("");
      this.requiredFieldError1 = "";
      this.mNewPasswordError = false;
    }
    newPwdElm.reportValidity();





    if (!this.confirmNewPassword) {
      hasError = true;
      this.mNewConfirmPasswordError = true;
      confirmPwdElm.setCustomValidity("required");
      this.requiredFieldError2 = this.required4;
    } else { 
      confirmPwdElm.setCustomValidity("");
      this.requiredFieldError2 = "";
      this.mNewConfirmPasswordError = false;
    }
    confirmPwdElm.reportValidity();

    if (!this.oldPassword) {
      hasError = true;
      this.mOldPasswordError = true;
      oldPwdElm.setCustomValidity("required");
     
      this.requiredFieldError3 = this.required5;
    } else {
      oldPwdElm.setCustomValidity("");
      this.requiredFieldError3 = "";
      this.mOldPasswordError = false;
    }
    oldPwdElm.reportValidity();


    if (this.newPassword != this.confirmNewPassword && this.newPassword!='' && this.newPassword!=null && this.confirmNewPassword!='' && this.confirmNewPassword!=null) {
      hasError = true;
      this.mPwdMatch = true;
      confirmPwdElm.setCustomValidity("Passwords do not match");
      this.pwdMatchError2 = this.required6;
    } else {
      confirmPwdElm.setCustomValidity("");
      this.pwdMatchError2 = "";
      this.mPwdMatch = false;
    }
    confirmPwdElm.reportValidity();
    if (hasError === true) {
      this.ErrorModalOpen = true;
    }
    if (!hasError) {
      this.openModal = false;
      changePassword({
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword,
        oldPassword: this.oldPassword
      })


      
        .then((result) => {
          //console.log('return value:',result);
          if (result != null) {
            this.dispatchEvent(
              new ShowToastEvent({
                title: this.Success,
                message: this.required7,
                variant: "success"
              })
            );
          }
          else{
            this.dispatchEvent(
              new ShowToastEvent({
                title: this.Error,
                message: this.required8,
                variant: "error"
              })
            );

          }
        })
        .catch((error) => {
          console.log(error);
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Error!!",
              message: "Please Enter Correct Values.",
              variant: "error"
            })
          );
        });
      eval("$A.get('e.force:refreshView').fire();"); 
    }
  }
  //this method is used for updating the my profile details.
  onSave() {
    this.speakingLanguageAgeFind = false;
    let valuez = this.rec.Age_at_second_spoken_language__c;
    if ((valuez >= 0 && valuez <= 115) || valuez == undefined) {
      this.speakingLanguageAgeFind = true;
    }

    this.rec.MailingCity = this.city;
    this.rec.MailingCountryCode = this.selectedCountry;
    this.rec.MailingStateCode = this.selectedState;
    this.rec.MailingStreet = this.address1;
    this.rec.MailingPostalCode = this.zipcode;
    this.rec.Id = this.data.ContactId;

    //console.log('checking address',this.rec);

    if (this.speakingLanguageAgeFind == true) {
      upsertContact({
        con: this.rec
      })
        .then((result) => {
          if (result) {
            this.ProfileUpdateModal = true;
            //console.log('ssssss');
          } else {
            //console.log("Fields NOT updated", result);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
    else {
      if (this.rec.Age_at_second_spoken_language__c < 0 || this.rec.Age_at_second_spoken_language__c > 115) {
        this.ErrorModalOpenAge = true;
        document.querySelector("body").style.overflow = 'visible';
      }
    }
    
  }
  closeModalAge() {
    //this.isModalOpen = false;
    this.ErrorModalOpenAge = false;

  }

}