import { LightningElement, track,api,wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import acceptancePage01 from '@salesforce/label/c.acceptancePage01';
import acceptancePage02 from '@salesforce/label/c.acceptancePage02';
import Logo_Link from '@salesforce/label/c.Logo_Link';
import Blog_Link from '@salesforce/label/c.live_URL_2';
import Games_Dashboard from '@salesforce/label/c.Games_Dashboard';
import community_url from '@salesforce/label/c.Community_Url';

export default class alreadysubmitted extends NavigationMixin(LightningElement) {
   
    logoimage2 =  images + '/images/MindCrowd-Logo-Color-White-Text.png';
		label={acceptancePage01,
					acceptancePage02}
    @api acceptancePage02 = 'Thank you for participating in our research study! A kit will be mailed to the address you provided soon. If you have any questions please email the study coordinator at mindcrowdquestion@tgen.org';
    @api acceptancePage03 = 'Go to the MindCrowd Website';
    @api acceptancePage04 = 'Want to learn more about this research';
    @api acceptancePage05 = 'Our records show that you have already completed this survey. Thank you for your time.'
    @api acceptancePage06 = 'My Games';

    url_gamespage = community_url + '/s/' + Games_Dashboard;

    @track showButton = false;

    connectedCallback() {
      if (window.location.pathname.indexOf('vip') > -1) {
          this.showButton = true;
          console.log('Show Button true', this.showButton);
 
      } else {
          this.showButton = false;
          console.log('Show Button false', this.showButton);
                      
      }
      console.log('ggghh', this.showButton);
      }

    navigateToGamePage() {
      this[NavigationMixin.Navigate]({
          type: 'standard__webPage',
          attributes: {
              url: this.url_gamespage
          }
      });
    }
    
    navigateToWebPage() {
        // Navigate to a URL
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: Blog_Link //'https://blog.mindcrowd.org/'
            }
        },
        true // Replaces the current page in your browser history with the URL
      );
    }

    navigateToHomePage() {
      // Navigate to a URL
      this[NavigationMixin.Navigate]({
          type: 'standard__webPage',
          attributes: {
              url: Logo_Link //https://mindcrowd.org/s/'
           }
      },
      true // Replaces the current page in your browser history with the URL
    );
  }
}