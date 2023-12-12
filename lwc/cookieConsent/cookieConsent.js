import { LightningElement, track } from 'lwc';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { isCategoryAllowedForCurrentConsent, setCookieConsent }

//     from 'lightning/userConsentCookie';
 import Community_Url from '@salesforce/label/c.Community_Url';
 import url_testlanguage from '@salesforce/label/c.url_testlanguage';
 import live_URL_5  from '@salesforce/label/c.live_URL_5';


export default class CookieConsent extends LightningElement {
     label = {live_URL_5}
    @track isModalOpen = true;//this.getCookie('cookieAccept');
    @track preferences = this.getCookie('preferences');
    getCookie(name) {
        var cookieString = "; " + document.cookie;
        if(cookieString.includes('LSKey-c$')){
           var parts = cookieString.split("; LSKey-c$" + name + "=");
        }else{
           var parts = cookieString.split("; " + name + "=");
        }
         if (parts.length === 2) {
             return parts.pop().split(";").shift();
         }
         return null;
    }
  
    handleClickSetConsent() {
         document.cookie = 'cookieAccept = ' + true;
         document.cookie = 'preferences = ' + true; 
         this.preferences = true;
         this.isModalOpen = true;
    }

    renderedCallback() {
        if (this.bestcase) {
            return;
        }
        Promise.all([

        ]).then(() => {
            var myPageRef = window.location.href;
            var tempurl = Community_Url + '/s/' + url_testlanguage;
            console.log('pageUrl = ', tempurl);
            if (tempurl != myPageRef) {
                this.isModalOpen = true;
                
            } 

        });
    }

}