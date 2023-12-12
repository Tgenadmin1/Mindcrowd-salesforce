import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import { NavigationMixin } from 'lightning/navigation';
import team_text_1 from '@salesforce/label/c.team_text_1';
import team_text_2 from '@salesforce/label/c.team_text_2';
import team_text_3 from '@salesforce/label/c.team_text_3';
import team_text_4 from '@salesforce/label/c.team_text_4';
import team_text_5 from '@salesforce/label/c.team_text_5';
import team_text_6 from '@salesforce/label/c.team_text_6';
import team_text_7 from '@salesforce/label/c.team_text_7';
import team_text_8 from '@salesforce/label/c.team_text_8';
import team_text_9 from '@salesforce/label/c.team_text_9';
import banner_Text_6 from '@salesforce/label/c.Banner_Text_6';
import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';

export default class Team extends NavigationMixin(LightningElement) {

    matt_huentleman = images + '/images/matt_huentleman.png';
    glisky_ryan = images + '/images/glisky_ryan.png';
    sponsor_tgen_small = images + '/images/sponsor_tgen_small.png';
    sponsor_uofa_small = images + '/images/sponsor_uofa_small.png';
    sponsor_api_small = images + '/images/sponsor_api_small.png';
    image2 = images + '/images/logo-df.png';
    image3 = images + '/images/sponsor_api.png';
    image3a = images + '/images/cityofHope_logo.png';
    image4 = images + '/images/sponsor_tgen.png';
    image5 = images + '/images/sponsor_uofa.png';
    image6 = images + '/images/tmlogo-small.png';
    part_of_solution = images + '/images/part_of_solution.png';
    
    label = {
        team_text_1,
        team_text_2,
        team_text_3,
        team_text_4,
        team_text_5,
        team_text_6,
        team_text_7,
        team_text_8,
        team_text_9,
        banner_Text_6

    }
    renderedCallback() {
        if (this.bestcase) {
            return;
        }
        Promise.all([

        ]).then(() => {
            const mainId = this.template.querySelector('.team');
            mainId.setAttribute('id', 'team');
        });
    }
    handleClick() {

        // this[NavigationMixin.Navigate]({
        //     "type": "standard__webPage",
        //     "attributes": {
        //       //  "url": "/research/s/consent"
        //       "url": Community_Url+"/s/consent"
        //     }
        // });
        window.location.href = Community_Url + '/s/consent';

    }
}