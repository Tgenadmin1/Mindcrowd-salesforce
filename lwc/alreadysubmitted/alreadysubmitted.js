import { LightningElement, track,api,wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import acceptancePage01 from '@salesforce/label/c.acceptancePage01';
import acceptancePage02 from '@salesforce/label/c.acceptancePage02';
import Logo_Link from '@salesforce/label/c.Logo_Link';
import Blog_Link from '@salesforce/label/c.live_URL_2';
export default class AcceptancePage  extends NavigationMixin(LightningElement) {
   
    logoimage2 =  images + '/images/MindCrowd-Logo-Color-White-Text.png';
		label={acceptancePage01,
					acceptancePage02}
    @api acceptancePage02 = 'Thank you for participating in our research study! A kit will be mailed to the address you provided soon. If you have any questions please email the study coordinator at mindcrowdquestion@tgen.org';
    @api acceptancePage03 = 'Go to the MindCrowd Website';
    @api acceptancePage04 = 'Want to learn more about this research';
    @api acceptancePage05 = 'Our records show that you have already completed this survey. Thank you for your time.'
    
    navigateToWebPage() {
        // Navigate to a URL
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: Blog_Link //'https://blog.mindcrowd.org/'
               // url: '../s/'

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
             // url: '../s/

          }
      },
      true // Replaces the current page in your browser history with the URL
    );
  }
}