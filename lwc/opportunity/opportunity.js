import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import { NavigationMixin } from 'lightning/navigation';
import opportunity_text_1 from '@salesforce/label/c.opportunity_text_1';
import opportunity_text_2 from '@salesforce/label/c.opportunity_text_2';
import opportunity_text_3 from '@salesforce/label/c.opportunity_text_3';
import opportunity_text_4 from '@salesforce/label/c.opportunity_text_4';
import banner_Text_6 from '@salesforce/label/c.Banner_Text_6';
import opportunity_image_1 from '@salesforce/label/c.opportunity_image_1';
import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';

export default class Opportunity extends NavigationMixin(LightningElement) {
    opportunity_sideimage = images + '/images/opportunity_sideimage.png';
    // part_of_solution = images + '/images/part_of_solution.png';
    part_of_solution = images + '/images/'+opportunity_image_1;
    label={
        opportunity_text_1,
        opportunity_text_2,
        opportunity_text_3,
        opportunity_text_4,
        banner_Text_6
    }
    renderedCallback() {
        if (this.bestcase) {
            return;
        }
        Promise.all([

        ]).then(() => {
            const mainId = this.template.querySelector('.opportunity');
            mainId.setAttribute('id', 'opportunity');
        });
    }
    handleClick() {
        // this[NavigationMixin.Navigate]({
        //     "type": "standard__webPage",
        //     "attributes": {
        //        // "url": "/research/s/consent"
        //        "url": Community_Url+"/s/consent"
        //     }
        // });
        window.location.href = Community_Url+"/s/consent"
    }
}