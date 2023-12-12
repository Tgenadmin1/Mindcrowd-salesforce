import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import { NavigationMixin } from 'lightning/navigation';
import project_text_1 from '@salesforce/label/c.project_text_1';
import project_text_2 from '@salesforce/label/c.project_text_2';
import project_text_3 from '@salesforce/label/c.project_text_3';
import project_text_4 from '@salesforce/label/c.project_text_4';
import project_text_5 from '@salesforce/label/c.project_text_5';
import project_text_6 from '@salesforce/label/c.project_text_6';
import project_text_7 from '@salesforce/label/c.project_text_7';
import project_text_8 from '@salesforce/label/c.project_text_8';
import project_image_1 from '@salesforce/label/c.project_image_1';
import project_image_2 from '@salesforce/label/c.project_image_2';
import project_image_3 from '@salesforce/label/c.project_image_3';
import banner_Text_6 from '@salesforce/label/c.Banner_Text_6';
import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';

export default class Project extends NavigationMixin (LightningElement) {
    label={
        project_text_1,
        project_text_2,
        project_text_3,
        project_text_4,
        project_text_5,
        project_text_6,
        project_text_7,
        project_text_8,
        project_image_1,
        project_image_2,
        project_image_3,
        banner_Text_6
    }
    circle_phase_one = images + '/images/'+project_image_1;
    circle_phase_two = images + '/images/'+project_image_2;
    one_cause = images + '/images/'+project_image_3;


    renderedCallback(){ 
        if (this.bestcase) {
            return;
        }
        Promise.all([
                   
                     ]).then(() => {
                        const mainId = this.template.querySelector('.project');
                        mainId. setAttribute('id','project');
                     });
    }
    handleClick(){
        
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