import { LightningElement } from 'lwc';
import Community_Url from '@salesforce/label/c.Community_Url';
import consent_URL from '@salesforce/label/c.url_testlanguage';
import url_additionalquestions from '@salesforce/label/c.url_additionalquestions';
import url_emailrequestvipinvite from '@salesforce/label/c.url_emailrequestvipinvite';


export default class EmailPageCheck extends LightningElement {


    
     renderedCallback() {
        // const urlParams = new URLSearchParams(document.location.search.substring(1));
        // const skip = urlParams.get('skip');
        //console.log('skip = ', skip);
        if(!window.location.toString().includes("live-preview")){
          //  if (skip != 'true') {
        if(localStorage.getItem('consent') != "true"){
            window.location = Community_Url + "/s/" + consent_URL;
        }else if((localStorage.getItem('c__id') == '' || localStorage.getItem('c__id') ==undefined) && localStorage.getItem('consent') == "true"){

            window.location = Community_Url + "/s/" + url_aboutyourbrain;
        }else{
            var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
            //console.log('lastBrain: ',this.lastBrain);

            if(lastBrain!=url_additionalquestions && lastBrain!=url_emailrequestvipinvite ) {    
                 window.location = localStorage.getItem('LastPage');
            }else{

                localStorage.setItem('LastPage',  document.URL);
                
            }
        }
    }
// }   else{
//         localStorage.setItem('LastPage',  document.URL);
//     }
    }
    }