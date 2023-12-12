import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import { NavigationMixin } from 'lightning/navigation';
import faq_text_1 from '@salesforce/label/c.faq_text_1';
import faq_text_2 from '@salesforce/label/c.faq_text_2';
import faq_text_3 from '@salesforce/label/c.faq_text_3';
import faq_text_4 from '@salesforce/label/c.faq_text_4';
import faq_text_5 from '@salesforce/label/c.faq_text_5';
import faq_text_6 from '@salesforce/label/c.faq_text_6';
import faq_text_7 from '@salesforce/label/c.faq_text_7';
import faq_text_8 from '@salesforce/label/c.faq_text_8';
import faq_text_9 from '@salesforce/label/c.faq_text_9';
import faq_text_10 from '@salesforce/label/c.faq_text_10';
import faq_text_11 from '@salesforce/label/c.faq_text_11';
import faq_text_12 from '@salesforce/label/c.faq_text_12';
import faq_text_13 from '@salesforce/label/c.faq_text_13';
import faq_text_14 from '@salesforce/label/c.faq_text_14';
import faq_text_15 from '@salesforce/label/c.faq_text_15';
import faq_text_16 from '@salesforce/label/c.faq_text_16';
import faq_text_17 from '@salesforce/label/c.faq_text_17';
import faq_text_18 from '@salesforce/label/c.faq_text_18';
import faq_text_19 from '@salesforce/label/c.faq_text_19';
import faq_text_20 from '@salesforce/label/c.faq_text_20';
import faq_text_21 from '@salesforce/label/c.faq_text_21';
import faq_text_22 from '@salesforce/label/c.faq_text_22';
import faq_text_23 from '@salesforce/label/c.faq_text_23';
import faq_text_24 from '@salesforce/label/c.faq_text_24';
import faq_text_25 from '@salesforce/label/c.faq_text_25';
import faq_text_26 from '@salesforce/label/c.faq_text_26';
import Banner_image_1 from '@salesforce/label/c.Banner_image_1';

import banner_Text_6 from '@salesforce/label/c.Banner_Text_6';
import banner_Text_7 from '@salesforce/label/c.Banner_Text_7';
import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';



export default class Faq extends NavigationMixin (LightningElement) {

    // image1 = images + '/images/home_compare_graphic.png';
    image1 = images + '/images/'+Banner_image_1;
    image2 = images + '/images/logo-df.png';
    image3 = images + '/images/sponsor_api.png';
    image4 = images + '/images/sponsor_tgen.png';
    image5 = images + '/images/sponsor_uofa.png';
    image6 = images + '/images/tmlogo-small.png';
    timeIcon =  images + '/images/time-icon-w.svg';
    twitter =  images + '/images/twitter-icon.png';
    facebook =  images + '/images/facebook-icon.png';
    pinterest =  images + '/images/pinterest-icon.png';
    instagram  =  images + '/images/instagram-icon.png';
    image3a = images + '/images/cityofHope_logo.png';

    label = {
        faq_text_1,
        faq_text_2,
        faq_text_3,
        faq_text_4,
        faq_text_5,
        faq_text_6,
        faq_text_7,
        faq_text_8,
        faq_text_9,
        faq_text_10,
        faq_text_11,
        faq_text_12,
        faq_text_13,
        faq_text_14,
        faq_text_15,
        faq_text_16,
        faq_text_17,
        faq_text_18,
        faq_text_19,
        faq_text_20,
        faq_text_21,
        faq_text_22,
        faq_text_23,
        faq_text_24,
        faq_text_25,
        faq_text_26,
        banner_Text_6,
        banner_Text_7
    }

    handleClick2() {

        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
               // "url": "/research/s/consent"
               "url": Community_Url+"/s/consent"
            }
        });

    }
}