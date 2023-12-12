import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import Banner_image_1 from '@salesforce/label/c.Banner_image_1';
import banner_h3 from '@salesforce/label/c.h_Banner_h3';
import banner_Text_2 from '@salesforce/label/c.banner_Text_2';
import banner_Text_3 from '@salesforce/label/c.Banner_Text_3';
import banner_Text_4 from '@salesforce/label/c.Banner_Text_4';
import banner_Text_5 from '@salesforce/label/c.Banner_Text_5';
import banner_Text_6 from '@salesforce/label/c.Banner_Text_6';
import banner_Text_7 from '@salesforce/label/c.Banner_Text_7';
import banner_Text_8 from '@salesforce/label/c.Banner_Text_8';
import banner_Text_9 from '@salesforce/label/c.Banner_Text_9';
import banner_Text_10 from '@salesforce/label/c.Banner_Text_10';
import banner_Text_10b from '@salesforce/label/c.banner_Text_10b';
import Community_Url from '@salesforce/label/c.Community_Url';
import homesection6001 from '@salesforce/label/c.homesection6001';
import url_testlanguage from '@salesforce/label/c.url_testlanguage';

export default class HomeSection6 extends LightningElement {
    image1 = images + '/images/'+Banner_image_1;
    Community_Url_consent = Community_Url + '/s/'+url_testlanguage;
    label={
        banner_h3,
        banner_Text_2,
        banner_Text_3,
        banner_Text_4,
        banner_Text_5,
        banner_Text_6,
        banner_Text_7,
        banner_Text_8,
        banner_Text_9,
        banner_Text_10,
        banner_Text_10b,
        homesection6001
    }
    handleClick() {

        window.location.href = Community_Url + '/s/'+url_testlanguage;

    }
}