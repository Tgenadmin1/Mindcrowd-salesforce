import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import { NavigationMixin } from 'lightning/navigation';
import info_faq_text_1 from '@salesforce/label/c.info_faq_text_1';
import info_faq_text_2 from '@salesforce/label/c.info_faq_text_2';
import info_faq_text_3 from '@salesforce/label/c.info_faq_text_3';
import info_faq_text_4 from '@salesforce/label/c.info_faq_text_4';
import info_faq_text_5 from '@salesforce/label/c.info_faq_text_5';
import info_faq_text_6 from '@salesforce/label/c.info_faq_text_6';
import info_faq_text_7 from '@salesforce/label/c.info_faq_text_7';
import info_faq_text_8 from '@salesforce/label/c.info_faq_text_8';
import info_faq_text_9 from '@salesforce/label/c.info_faq_text_9';
import info_faq_text_10 from '@salesforce/label/c.info_faq_text_10';
import info_faq_text_11 from '@salesforce/label/c.info_faq_text_11';
import info_faq_text_12 from '@salesforce/label/c.info_faq_text_12';
import info_faq_text_12b from '@salesforce/label/c.info_faq_text_12b';
import info_faq_text_13 from '@salesforce/label/c.info_faq_text_13';
import info_faq_text_14 from '@salesforce/label/c.info_faq_text_14';
import info_faq_text_15 from '@salesforce/label/c.info_faq_text_15';
import info_faq_text_16 from '@salesforce/label/c.info_faq_text_16';
import info_faq_text_17 from '@salesforce/label/c.info_faq_text_17';
import info_faq_text_18 from '@salesforce/label/c.info_faq_text_18';
import info_faq_text_19 from '@salesforce/label/c.info_faq_text_19';
import info_faq_text_20 from '@salesforce/label/c.info_faq_text_20';
import info_faq_text_21 from '@salesforce/label/c.info_faq_text_21';
import info_faq_text_22 from '@salesforce/label/c.info_faq_text_22';
import info_faq_text_23 from '@salesforce/label/c.info_faq_text_23';
import info_faq_text_24 from '@salesforce/label/c.info_faq_text_24';
import info_faq_text_25 from '@salesforce/label/c.info_faq_text_25';
import info_faq_text_26 from '@salesforce/label/c.info_faq_text_26';
import info_faq_text_27 from '@salesforce/label/c.info_faq_text_27';
import info_faq_text_28 from '@salesforce/label/c.info_faq_text_28';
import info_faq_text_29 from '@salesforce/label/c.info_faq_text_29';
import info_faq_text_30 from '@salesforce/label/c.info_faq_text_30';
import info_faq_text_31 from '@salesforce/label/c.info_faq_text_31';
import info_faq_text_32 from '@salesforce/label/c.info_faq_text_32';
import info_faq_text_33 from '@salesforce/label/c.info_faq_text_33';
import info_faq_text_34 from '@salesforce/label/c.info_faq_text_34';


import Banner_image_1 from '@salesforce/label/c.Banner_image_1';

import Community_Url from '@salesforce/label/c.Community_Url';



export default class InfoFAQ extends NavigationMixin (LightningElement) {

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
        info_faq_text_1,
        info_faq_text_2,
        info_faq_text_3,
        info_faq_text_4,
        info_faq_text_5,
        info_faq_text_6,
        info_faq_text_7,
        info_faq_text_8,
        info_faq_text_9,
        info_faq_text_10,
        info_faq_text_11,
        info_faq_text_12,
        info_faq_text_12b,
        info_faq_text_13,
        info_faq_text_14,
        info_faq_text_15,
        info_faq_text_16,
        info_faq_text_17,
        info_faq_text_18,
        info_faq_text_19,
        info_faq_text_20,
        info_faq_text_21,
        info_faq_text_22,
        info_faq_text_23,
        info_faq_text_24,
        info_faq_text_25,
        info_faq_text_26,
        info_faq_text_27,
        info_faq_text_28,
        info_faq_text_29,
        info_faq_text_30,
        info_faq_text_31,
        info_faq_text_32,
        info_faq_text_33,
        info_faq_text_34
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