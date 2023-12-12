import { LightningElement,wire,track,api } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import { NavigationMixin } from 'lightning/navigation';
import getProgressMap from '@salesforce/apex/ProgressBarController.getProgressMap';
// importing Custom Label
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
import Banner_image_1 from '@salesforce/label/c.Banner_image_1';

//import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';



export default class Pagecontent extends NavigationMixin (LightningElement) {

    image1 = images + '/images/'+Banner_image_1;
    image2 = images + '/images/logo-df.png';
    image3 = images + '/images/sponsor_api.png';
    image3a = images + '/images/cityofHope_logo.png';
    image4 = images + '/images/sponsor_tgen.png';
    image5 = images + '/images/sponsor_uofa.png';
    image6 = images + '/images/tmlogo-small.png';
    timeIcon =  images + '/images/time-icon-w.svg';
    twitter =  images + '/images/twitter-icon.png';
    facebook =  images + '/images/facebook-icon.png';
    pinterest =  images + '/images/pinterest-icon.png';
    instagram  =  images + '/images/instagram-icon.png';

    //  mapData= [];
     mapOfValues = [];
    // mapOfValues2 = [];
     @track count;
     @track percentage;

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
        banner_Text_10b
    }
   
    @wire(getProgressMap)
    mapOfData({data, error}) {
        if(data) { 
            for(let key in data){
                this.mapOfValues.push({value:data[key],key:key});
            }
            this.count=(this.mapOfValues[0]).value; 
            this.percentage=(this.mapOfValues[1]).value;
            this.template.querySelector(".progress_bar").style="width:" + this.percentage + "%";
        }
        else if(error) {
            console.log('I am having error in catchment.');
            window.console.log(error);
        }
    }

    // handleClick1(){ 
    //     this[NavigationMixin.Navigate]({
    //         "type": "standard__webPage",
    //         "attributes": {
    //             "url": Community_Url+"/s/game"
    //         }
    //     });
    //    // window.location.href= Community_Url+'/s/game';
    // }
    handleClick2() {
       // console.log(label.community_name)
      // alert('ssss' + Community_Url)
        // this[NavigationMixin.Navigate]({
        //     "type": "standard__webPage",
        //     "attributes": {
        //         "url": Community_Url+"/s/consent"
        //     }
        // });
        window.location.href = Community_Url + '/s/consent';

    }
}