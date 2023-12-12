import { LightningElement,wire,track,api } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import { NavigationMixin } from 'lightning/navigation';
import getProgressMap from '@salesforce/apex/ProgressBarController.getProgressMap';
// importing Custom Label


//import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';
import url_sharingmyresults from '@salesforce/label/c.url_sharingmyresults';
import Banner_image_1 from '@salesforce/label/c.Banner_image_1';
import banner_Text_10 from '@salesforce/label/c.Banner_Text_10';
import homesection3002 from '@salesforce/label/c.homesection3002';
import homesection3004 from '@salesforce/label/c.homesection3004';
import homesection3003 from '@salesforce/label/c.homesection3003';
url_sharingmyresults






export default class HomeSection3 extends NavigationMixin (LightningElement) {

    //  facebookshare_Url = 'https://www.facebook.com/sharer/sharer.php?u='+ document.location.href;
    // twitterShare_Url = 'https://twitter.com/intent/tweet?text=Spatial+Memory+Impairment+in+People+with+Alzheimer’s&url=' + document.location.href;
    // linkedinshare_Url ='https://www.linkedin.com/'
    facebookshare_Url = 'https://www.facebook.com/sharer/sharer.php?u='+ Community_Url;
    twitterShare_Url = 'https://twitter.com/intent/tweet?text=Spatial+Memory+Impairment+in+People+with+Alzheimer’s&url=' + Community_Url;
    linkedinshare_Url ='https://www.linkedin.com/'+Community_Url;
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
    label = {banner_Text_10,homesection3002,homesection3004,homesection3003};

    //  mapData= [];
     mapOfValues = [];
    // mapOfValues2 = [];
     @track count;
     @track percentage;
     @track homepageText;
     countInnumber=0;
     @api banner_Text_10 = "MILLION";
     @api homesection3002 = "It’s a Game. It’s Research. It’s a Memory and Attention Test. It’s the MindCrowd Study!";
     @api strTitle;

    
   
    @wire(getProgressMap)
    mapOfData({data, error}) {
        if(data) { 
            for(let key in data){
                this.mapOfValues.push({value:data[key],key:key});
            }
            this.countInnumber=(this.mapOfValues[0]).value;
            this.count=parseInt(this.countInnumber).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.percentage=(this.mapOfValues[1]).value;
          
            this.template.querySelector(".progress_bar").style="width:" + this.percentage + "%";
        }
        else if(error) {
            console.log('I am having error in catchment.');
            window.console.log(error);
        }
    }


    handleClick2() {
         window.location.href = Community_Url + '/s/consent';

    }
    
    
    renderedCallback() {
        if (this.bestcase) {
            return;
        }
        Promise.all([

        ]).then(() => {
           // const surl = "window.open('https://www.facebook.com/sharer/sharer.php?u=https://dev-mindcrowd-game.cs194.force.com/MindCrowd/s/results','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
           const surl ="";
           const turl = ""
           const hturl ="";
           const hsrul ="";

           var href = document.location.href;
           var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
            console.log('url = ', lastPathSegment);
            //var cid = this.getCookie('c__id');
            //cid.trim(cid);
            var shareUrl = Community_Url+'/s/'+ url_sharingmyresults +'?id='+ this.getCookie('c__id');
            console.log('Community_Url = ', document.location.pathname.endsWith('/s/'));
            if( document.location.pathname.endsWith('/s/')) {
                this.homepageText = homesection3003 ;
            }else{
                this.homepageText = homesection3004 ;
                
            }


            // if(lastPathSegment == 'results'){
            //     console.log('sss = ', this.getCookie('c__id'))
            //      this.surl = "window.open('https://www.facebook.com/sharer/sharer.php?u=" + shareUrl + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
            //      this.turl = "window.open('https://twitter.com/intent/tweet?&url=" + shareUrl + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;";
            //      this.hsrul = "'https://www.facebook.com/sharer/sharer.php?u=" + shareUrl + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'";
            //      this.hturl =  "https://twitter.com/intent/tweet?&url=" + shareUrl + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650";
            // }else{
            //     this.surl = "window.open('https://www.facebook.com/sharer/sharer.php?u=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
            //     this.turl = "window.open('https://twitter.com/intent/tweet?&url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
            //     this.lurl = "window.open('https://www.linkedin.com/sharing/share-offsite/?url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
            //     this.hsrul = "'https://www.facebook.com/sharer/sharer.php?u=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'";
            //     this.hturl =  "https://twitter.com/intent/tweet?&url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650";
            //     this.hlurl =  "https://www.linkedin.com/sharing/share-offsite/?url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650";

            // }
           // console.log('ssssss = ', document.querySelector("meta[name=twitter:card"));

           var x = document.getElementsByTagName("META");
           var txt = "";
           var i;
           var imageURL;
           console.log('ssssss = ', x);
           for (i = 0; i < x.length; i++) {
               if (x[i].name=="orImage")
               {
                console.log('dddddd = ', x[i].content);
                   //alert(x[i].content);
                   imageURL = x[i].content;
                }
               
           } 



                this.surl = "window.open('https://www.facebook.com/sharer/sharer.php?u=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
                this.turl = "window.open('https://twitter.com/intent/tweet?&url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
                this.lurl = "window.open('https://www.linkedin.com/sharing/share-offsite/?url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
                this.purl = "window.open('https://www.pinterest.com/pin/create/button/?url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'); return false;"
                this.hsrul = "'https://www.facebook.com/sharer/sharer.php?u=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650'";
                this.hturl =  "https://twitter.com/intent/tweet?&url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650";
                this.hlurl =  "https://www.linkedin.com/sharing/share-offsite/?url=" + Community_Url + "','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650";
                // this.plurl =  "https://in.pinterest.com/pin-builder/?url=" + Community_Url + "/s/&media=https://dev-mindcrowd-game.cs194.force.com/MindCrowd/s/sfsites/c/resource/FeaturedImages/mindcrowd-memory-game-home-page.png','targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650";

                this.plurl=  "https://in.pinterest.com/pin-builder/?url=" + Community_Url + ",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=650"  
             
             const mainId = this.template.querySelector('.facebook-btn');
             const tmainId = this.template.querySelector('.twitter-btn');
             const lmainId = this.template.querySelector('.linkedin-btn');
             const pmainId = this.template.querySelector('.pinterest-btn');

             
             mainId.setAttribute('href', this.hsrul);
             tmainId.setAttribute('href', this.hturl);
             lmainId.setAttribute('href', this.hlurl);
             pmainId.setAttribute('href', this.plurl);
             mainId.setAttribute('onclick', this.surl);
             tmainId.setAttribute('onclick', this.turl);
             lmainId.setAttribute('onclick', this.lurl);
             pmainId.setAttribute('onclick', this.purl);


           //this.template.querySelector('.facebook-btn').addEventListener("onclick", this.facebookShare() , false);
        });
    }
    getCookie(name) {
        var cookieString = "; " + document.cookie;
        var parts = cookieString.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    }

     facebookShare(){
     // console.log('ssssssssssssss', this);
     
        console.log('urlwwww = ', document.location.href);
        // var urlLink = "https://www.facebook.com/sharer/sharer.php?u=" + "https://dev-mindcrowd-game.cs194.force.com/MindCrowd/resource/1639652898000/mindcrowd_style/images/dina-parise.jpg";
        // this.windowFeatures  = "width=500" ;
        // this.windowFeatures += ",height=400" ;
        // window.open(urlLink, "_blank", this.windowFeatures ); 
        // return;
        
        //window.open(this.href,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); return false;
      


   }
   twitterShare(){
   // console.log('ssssssssssssss', this);
      var urlLink = "https://twitter.com/intent/tweet?text=Cardiovascular%20Disease%20%26%20Smoking%20Affect%20Memory%20Performance&amp;url=" + "https://dev-mindcrowd-game.cs194.force.com/MindCrowd/resource/1639652898000/mindcrowd_style/images/dina-parise.jpg" + ",'twitter','1998858968'";
      this.windowFeatures  = "width=500" ;
      this.windowFeatures += ",height=400" ;
      window.open( urlLink, "_blank", this.windowFeatures );

 }

}