import { LightningElement } from 'lwc';
import Community_Url from '@salesforce/label/c.Community_Url';
import homesection2001 from '@salesforce/label/c.homesection2001';
import homesection2002 from '@salesforce/label/c.homesection2002';
import url_testlanguage from '@salesforce/label/c.url_testlanguage';
export default class HomeSection2 extends LightningElement {
    label = {

        homesection2001,
        homesection2002
      };
      Community_Url_consent = Community_Url + '/s/'+url_testlanguage;
    handleClick() {

        window.location.href = Community_Url + '/s/'+url_testlanguage;

    }
}