import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import { NavigationMixin } from 'lightning/navigation';
import problem_text_1 from '@salesforce/label/c.problem_text_1';
import problem_text_2 from '@salesforce/label/c.problem_text_2';
import problem_text_3 from '@salesforce/label/c.problem_text_3';
import problem_text_4 from '@salesforce/label/c.problem_text_4';
import problem_text_5 from '@salesforce/label/c.problem_text_5';
import problem_text_6 from '@salesforce/label/c.problem_text_6';
import banner_Text_6 from '@salesforce/label/c.Banner_Text_6';
import problem_image_1 from '@salesforce/label/c.problem_image_1';
import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';

export default class TheProblem extends NavigationMixin(LightningElement) {

    problem_sideimage = images + '/images/problem_sideimage.png';
    // we_need_help = images + '/images/we_need_help.png';
    we_need_help = images + '/images/'+problem_image_1;
    label={
        problem_text_1,
        problem_text_2,
        problem_text_3,
        problem_text_4,
        problem_text_5,
        problem_text_6,
        banner_Text_6
    }

    renderedCallback() {
        if (this.bestcase) {
            return;
        }
        Promise.all([

        ]).then(() => {
            const mainId = this.template.querySelector('.the-problem');
            mainId.setAttribute('id', 'problem');
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
        window.location.href = Community_Url + '/s/consent';

    }
}