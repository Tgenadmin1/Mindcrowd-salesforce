import { LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import Community_Url from '@salesforce/label/c.Community_Url';
import homesection4001 from '@salesforce/label/c.homesection4001';
import homesection4002 from '@salesforce/label/c.homesection4002';
import homesection4003 from '@salesforce/label/c.homesection4003';
import homesection4004 from '@salesforce/label/c.homesection4004';
import homesection4005 from '@salesforce/label/c.homesection4005';
import homesection4006 from '@salesforce/label/c.homesection4006';
import homesection4007 from '@salesforce/label/c.homesection4007';
import homesection4008 from '@salesforce/label/c.homesection4008';
import homesection4009 from '@salesforce/label/c.homesection4009';
import homesection4010 from '@salesforce/label/c.homesection4010';
import homesection4011 from '@salesforce/label/c.homesection4011';
import homesection4012 from '@salesforce/label/c.homesection4012';
import homesection4013 from '@salesforce/label/c.homesection4013';
import homesection4014 from '@salesforce/label/c.homesection4014';
import homesection4015 from '@salesforce/label/c.homesection4015';
import homesection4016 from '@salesforce/label/c.homesection4016';


import url_testlanguage from '@salesforce/label/c.url_testlanguage';

export default class HomeSection4 extends LightningElement {

    image1 = images + '/images/lynda-carter.jpg';
    image2 = images + '/images/dina-parise.jpg';
    image3 = images + '/images/eric-garcia.jpg';
    image4 = images + '/images/leslie-martin.jpg';
    image1Thamb1 = images + '/images/lynda-carter-wonder-woman.jpg';
    image1Thamb2 = images + '/images/dina-parise-racing.jpg';
    image1Thamb3 = images + '/images/eric-garcia-uncle-scotchy.jpg';
    image1Thamb4 = images + '/images/leslie-martin-author.jpg';
    Community_Url_consent = Community_Url + '/s/'+url_testlanguage;
    resizeframe = 'true';
		label={homesection4001,
					homesection4002,
					homesection4003,
					homesection4004,
					homesection4005,
					homesection4006,
					homesection4007,
					homesection4008,
					homesection4009,
					homesection4010,
					homesection4011,
					homesection4012,
					homesection4013,
					homesection4014,
					homesection4015,
					homesection4016}

           

    renderedCallback() {
     
      this.vid = this.template.querySelector('video');
        if (this.bestcase) {
            return;
        }
        Promise.all([
         // loadScript(this, images + '/images/lynda-carter.jpg'),

        ]).then(() => {
            const image1 = this.template.querySelector('.image1');
            const image2 = this.template.querySelector('.image2');
            const image3 = this.template.querySelector('.image3');
            const image4 = this.template.querySelector('.image4');
            image1.setAttribute('id', 'image1');
            image2.setAttribute('id', 'image1');
            image3.setAttribute('id', 'image1');
            image4.setAttribute('id', 'image1');

            const player = this.template.querySelector('.player');
            player.setAttribute('id', 'player');
           // player.setAttribute('height', this.template.querySelector('.overlay-img').offsetHeight +'px') ;
            
           
           
           

        });

       
        
    }
    
    connectedCallback() {

      window.addEventListener('resize', this.handleResize);
      setTimeout(() => {
        this.handleResize();
        
      }, 3000);
      
   }
  

   handleResize = () => {
    //custom code

    setTimeout(() => {
      // if(this.template.querySelector('.overlay-img').offsetHeight == 0 && this.resizeframe == 'true') {
      //   this.handleResize();
      // }
      
      console.log('vvvvvvvvvvvvvvvvvv', this.resizeframe, '========', this.template.querySelector('.overlay-img').offsetHeight);
      if('window.width = ', screen.width < 821){
        this.template.querySelector('.player2').setAttribute('height', this.template.querySelector('.overlay-img2').offsetHeight +'px') ;
      }else{
        this.template.querySelector('.player1').setAttribute('height', this.template.querySelector('.overlay-img').offsetHeight +'px') ;
  
        //this.template.querySelector('.desktop-text1').setAttribute('style', 'max-height:'+ this.template.querySelector('.overlay-img').offsetHeight +'px') ;
  
        
  
      }
    }, 400);
    
    //console.log('window.width = ', screen.width)
        //console.log('sssssseeee = ', this.template.querySelector('.overlay-img2').offsetHeight);
       
  }
    
    imageChange1() {

      console.log(' this.resizeframe = ',  this.resizeframe);
      this.resizeframe = 'true';
      if('window.width = ', screen.width < 821){
        this.template.querySelector('.m-image1').classList.remove('slds-hide');
       this.template.querySelector('.m-image2').classList.add('slds-hide');
       this.template.querySelector('.m-image3').classList.add('slds-hide');
       this.template.querySelector('.m-image4').classList.add('slds-hide');

       this.template.querySelector('.m-text1').classList.remove('slds-hide');
       this.template.querySelector('.m-text2').classList.add('slds-hide');
       this.template.querySelector('.m-text3').classList.add('slds-hide');
       this.template.querySelector('.m-text4').classList.add('slds-hide');
       this.iframeId = this.template.querySelector('.player2');
       this.iframeId.src = Community_Url + "/s/gamepoc";
       
       this.template.querySelector('.m-overlay-img2').classList.remove('slds-hide');
       this.template.querySelector('.video-overlay2').classList.remove('slds-hide');
       this.iframeId.classList.add('opacity');

      }else{
        
        this.template.querySelector('.image1').classList.remove('slds-hide');
       this.template.querySelector('.image2').classList.add('slds-hide');
       this.template.querySelector('.image3').classList.add('slds-hide');
       this.template.querySelector('.image4').classList.add('slds-hide');

       this.template.querySelector('.text1').classList.remove('slds-hide');
       this.template.querySelector('.text2').classList.add('slds-hide');
       this.template.querySelector('.text3').classList.add('slds-hide');
       this.template.querySelector('.text4').classList.add('slds-hide');
       this.iframeId = this.template.querySelector('.player');
       this.iframeId.src = Community_Url + "/s/gamepoc";
       
       this.template.querySelector('.video-overlay').classList.remove('slds-hide');
       this.iframeId.classList.add('opacity');
      }
       
      this.handleResize();
 
     }
     imageChange2() {
      console.log(' this.resizeframe = ',  this.resizeframe);
      this.resizeframe = 'false';
      if('window.width = ', screen.width < 821){

        this.template.querySelector('.m-image1').classList.add('slds-hide');
        this.template.querySelector('.m-image2').classList.remove('slds-hide');
        this.template.querySelector('.m-image3').classList.add('slds-hide');
        this.template.querySelector('.m-image4').classList.add('slds-hide');

        this.template.querySelector('.m-text1').classList.add('slds-hide');
        this.template.querySelector('.m-text2').classList.remove('slds-hide');
        this.template.querySelector('.m-text3').classList.add('slds-hide');
        this.template.querySelector('.m-text4').classList.add('slds-hide');
        this.iframeId = this.template.querySelector('.player2');
        this.iframeId.src = "";
        this.iframeId.classList.add('opacity');

      }else{
        this.template.querySelector('.image1').classList.add('slds-hide');
        this.template.querySelector('.image2').classList.remove('slds-hide');
        this.template.querySelector('.image3').classList.add('slds-hide');
        this.template.querySelector('.image4').classList.add('slds-hide');

        this.template.querySelector('.text1').classList.add('slds-hide');
        this.template.querySelector('.text2').classList.remove('slds-hide');
        this.template.querySelector('.text3').classList.add('slds-hide');
        this.template.querySelector('.text4').classList.add('slds-hide');
        this.iframeId = this.template.querySelector('.player');
        this.iframeId.src = "";
        this.iframeId.classList.add('opacity');

      }

       
        
  
      }
      imageChange3() {
        console.log(' this.resizeframe = ',  this.resizeframe);
        this.resizeframe = 'false';
        if('window.width = ', screen.width < 821){
          this.template.querySelector('.m-image1').classList.add('slds-hide');
        this.template.querySelector('.m-image2').classList.add('slds-hide');
        this.template.querySelector('.m-image3').classList.remove('slds-hide');
        this.template.querySelector('.m-image4').classList.add('slds-hide');

        this.template.querySelector('.m-text1').classList.add('slds-hide');
        this.template.querySelector('.m-text2').classList.add('slds-hide');
        this.template.querySelector('.m-text3').classList.remove('slds-hide');
        this.template.querySelector('.m-text4').classList.add('slds-hide');
        this.iframeId = this.template.querySelector('.player2');
        this.iframeId.src = "";
        this.iframeId.classList.add('opacity');
        }else{
          this.template.querySelector('.image1').classList.add('slds-hide');
        this.template.querySelector('.image2').classList.add('slds-hide');
        this.template.querySelector('.image3').classList.remove('slds-hide');
        this.template.querySelector('.image4').classList.add('slds-hide');

        this.template.querySelector('.text1').classList.add('slds-hide');
        this.template.querySelector('.text2').classList.add('slds-hide');
        this.template.querySelector('.text3').classList.remove('slds-hide');
        this.template.querySelector('.text4').classList.add('slds-hide');
        this.iframeId = this.template.querySelector('.player');
        this.iframeId.src = "";
        this.iframeId.classList.add('opacity');
        }
        
  
      }
      imageChange4() {
        console.log(' this.resizeframe = ',  this.resizeframe);
        this.resizeframe = 'false';
        console.log(' this.resizeframe = ',  this.resizeframe);
        if('window.width = ', screen.width < 821){
          this.template.querySelector('.m-image1').classList.add('slds-hide');
        this.template.querySelector('.m-image2').classList.add('slds-hide');
        this.template.querySelector('.m-image3').classList.add('slds-hide');
        this.template.querySelector('.m-image4').classList.remove('slds-hide');

        this.template.querySelector('.m-text1').classList.add('slds-hide');
        this.template.querySelector('.m-text2').classList.add('slds-hide');
        this.template.querySelector('.m-text3').classList.add('slds-hide');
        this.template.querySelector('.m-text4').classList.remove('slds-hide');
        this.iframeId = this.template.querySelector('.player2');
        this.iframeId.src = "";
        this.iframeId.classList.add('opacity');
        }else{
          this.template.querySelector('.image1').classList.add('slds-hide');
        this.template.querySelector('.image2').classList.add('slds-hide');
        this.template.querySelector('.image3').classList.add('slds-hide');
        this.template.querySelector('.image4').classList.remove('slds-hide');

        this.template.querySelector('.text1').classList.add('slds-hide');
        this.template.querySelector('.text2').classList.add('slds-hide');
        this.template.querySelector('.text3').classList.add('slds-hide');
        this.template.querySelector('.text4').classList.remove('slds-hide');
        this.iframeId = this.template.querySelector('.player');
        this.iframeId.src = "";
        this.iframeId.classList.add('opacity');
        }
        
  
      }


     
      

      handleClick() {
        if('window.width = ', screen.width < 821){
          this.template.querySelector('.video-overlay2').classList.add('slds-hide');
       
          // this.template.querySelector().setAttribute(src='https://www.youtube.com/embed/ZwiWI1q-vv8?feature=oembed&amp;autoplay=1&amp;loop=1&amp;controls=1&amp;mute=0&amp;playlist=ZwiWI1q-vv8')
          this.iframeId = this.template.querySelector('.player2');
          
          this.iframeId.src = "https://www.youtube.com/embed/ZwiWI1q-vv8?feature=oembed&amp;autoplay=1&amp;loop=1&amp;controls=1&amp;mute=0&amp;playlist=ZwiWI1q-vv8";
          this.iframeId.classList.remove('opacity');

        }else{
          this.template.querySelector('.video-overlay').classList.add('slds-hide');
       
          // this.template.querySelector().setAttribute(src='https://www.youtube.com/embed/ZwiWI1q-vv8?feature=oembed&amp;autoplay=1&amp;loop=1&amp;controls=1&amp;mute=0&amp;playlist=ZwiWI1q-vv8')
          this.iframeId = this.template.querySelector('.player');
          
          this.iframeId.src = "https://www.youtube.com/embed/ZwiWI1q-vv8?feature=oembed&amp;autoplay=1&amp;loop=1&amp;controls=1&amp;mute=0&amp;playlist=ZwiWI1q-vv8";
          this.iframeId.classList.remove('opacity');

        }

       
 
    }
    handleClick2() {
      window.location.href = Community_Url + '/s/'+url_consent;

     // this.template.querySelector('.player').classList.remove('opacity');

  }

    
}