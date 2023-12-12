import { LightningElement,api } from 'lwc';
import live_URL_7  from '@salesforce/label/c.live_URL_7';
import Catcme_text_11  from '@salesforce/label/c.Catcme_text_11';
import Catcme_text_12  from '@salesforce/label/c.Catcme_text_12';
import Catcme_text_13  from '@salesforce/label/c.Catcme_text_13';


export default class Donate extends LightningElement {
    label = {live_URL_7,Catcme_text_11,Catcme_text_12,Catcme_text_13};
    @api Catcme_text_11 = "Would you like to help fund scientific research?";
    @api Catcme_text_12 = "Your donation is greatly appreciated (and tax deductible too). The TGen Foundation, a non-profit organization, fuels biomedical research that positively impacts the lives of patients and their families. Please, visit the TGen Foundation site and contribute to help further such research efforts. Thank you in advance for your support.";
    @api strTitle;
    @api Catcme_text_13 = "Yes, I'd Like To Know More";
}