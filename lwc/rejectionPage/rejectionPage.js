//  Created By: {Girikon(Shweta Khunteta)}
// Created On: 11/05/2020
// Description/Purpose: Why and where it is used [TM-17]- It was created to redirect the user to 
// rejectionpage if he declines.
  
  

import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import images from '@salesforce/resourceUrl/mindcrowd_style';
import rejection1 from '@salesforce/label/c.rejection1';

export default class RejectionPage extends NavigationMixin (LightningElement) {
		label={rejection1}
    logoimage2 =  images + '/images/MindCrowd-Logo-Color-White-Text.png';
    navigateToWebPage() {
        // Navigate to a URL
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://blog.mindcrowd.org/'
                 // url: '../s/'

            }
        },
        true // Replaces the current page in your browser history with the URL
      );
    }
}