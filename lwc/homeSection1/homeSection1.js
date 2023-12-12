import { LightningElement, track } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import Community_Url from '@salesforce/label/c.Community_Url';
import homesection1001 from '@salesforce/label/c.homesection1001';
import homesection1002 from '@salesforce/label/c.homesection1002';
import homesection1003 from '@salesforce/label/c.homesection1003';
import homesection1004 from '@salesforce/label/c.homesection1004';
import homesection1005 from '@salesforce/label/c.homesection1005';
import homesection1006 from '@salesforce/label/c.homesection1006';
import url_testlanguage from '@salesforce/label/c.url_testlanguage';
import Community_language_Url from '@salesforce/label/c.Community_language_Url';
import nav_text_11 from '@salesforce/label/c.nav_text_11';

import { NavigationMixin } from 'lightning/navigation';

import {isCategoryAllowedForCurrentConsent,setCookieConsent} 
  from 'lightning/userConsentCookie'


export default class HomeSection1 extends NavigationMixin (LightningElement) {  
    @track checkedPreferences = isCategoryAllowedForCurrentConsent("Preferences");
    @track bannerShow = false;
    @track
    consent = {
        Preferences : this.checkedPreferences
        
    }
    preferences = this.checkedPreferences;
    label = {
        homesection1001,
       homesection1002,
       homesection1003,
       homesection1004,
       homesection1005,
       homesection1006,
       nav_text_11};
       
    image3a = images + '/images/cityofHope_logo.png';
    image4 = images + '/images/sponsor_tgen.png';
    image5 = images + '/images/sponsor_uofa.png';
    image6 = images + '/images/tmlogo-small.png';
    image7 = images + '/images/Johnshopkins-logo.png';
    image8 = images + '/images/mcknight-logo-with-space-below-1.png';
    image9 = images + '/images/emory-university-logo.png';
    image10 = images + '/images/sponsor_api.png';
    image11 = images + '/images/mindcrowd-contributors.jpg';
    image12 = images + '/images/MindCrowd-contributors-sq.jpg';
    Community_Url_consent = Community_Url + '/s/'+url_testlanguage;
    Community_language_Url = Community_language_Url + '/s/';
    browserLanguage = navigator.language;
    handleClick() {

    //    // var cookieAccept= getCookie('cookieAccept');
    //   var cookieAccept= this.getCookie('cookieAccept');
        
    //   // console.log('cookie = ', cookieAccept);
    //   if(cookieAccept){
    //     console.log('cookie = ', cookieAccept);
    //       return true;
    //   }else{
    //       alert('sssssss');
    //       return false;
    //   }
       
        //return false;
        // window.location.href = Community_Url + '/s/'+url_testlanguage;
        
     };
     renderedCallback() {
        if (this.bestcase) {
            return;
        }
        Promise.all([

        ]).then(() => {
            console.log('this.browserLanguage = ', this.browserLanguage);
           if(this.browserLanguage == 'es'){
            console.log('preferences2 = ', navigator.language);
            this.bannerShow = true;
           }else{
            this.bannerShow = false;
           }

        });
    }
 
     closeModal() {
        //this.isModalOpen = false;
        this.bannerShow = false;
        this.browserLanguage = 'en-US';
          
    }
  
    
}