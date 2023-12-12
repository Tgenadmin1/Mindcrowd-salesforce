import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';

import url_me_shapesgame from '@salesforce/label/c.url_me_shapesgame';
import url_me_flankergame from '@salesforce/label/c.url_me_flankergame';

import url_me_namesandfacesgame from '@salesforce/label/c.url_me_namesandfacesgame';

import url_me_switchinggame from '@salesforce/label/c.url_me_switchinggame';
import url_me_keeptrackgame from '@salesforce/label/c.url_me_keeptrackgame';
import url_me_objects from '@salesforce/label/c.url_me_objects';
import url_me_objects_time from '@salesforce/label/c.url_me_Objects_Time';
import url_Objects_Space from '@salesforce/label/c.url_Objects_Space';
import url_me_wordpairsgame from '@salesforce/label/c.url_me_wordpairsgame';
import url_me_reactgame from '@salesforce/label/c.url_me_reactgame';



import getCurrentContact from '@salesforce/apex/CustomLoginController.getCurrentContact';
import restrictExpandedGames from '@salesforce/apex/CustomLoginController.restrictExpandedGames';

export default class GamesPage extends NavigationMixin(LightningElement) {
    label = {
       
        community_name
    }
    url_wordpairsgame = Community_Url + "/s/"+url_me_wordpairsgame;
    url_reactgame = Community_Url + "/s/"+url_me_reactgame;
    url_shapesgame=Community_Url + "/s/"+url_me_shapesgame;
    url_flankergame=Community_Url + "/s/"+url_me_flankergame;
    url_namesandfacesgame=Community_Url + "/s/"+url_me_namesandfacesgame;
    url_switchinggame=Community_Url + "/s/"+url_me_switchinggame;
    url_keeptrackgame=Community_Url + "/s/"+url_me_keeptrackgame;
    url_objects=Community_Url + "/s/"+url_me_objects;
    url_objects_time=Community_Url + "/s/"+url_me_objects_time;
    url_objects_space=Community_Url + "/s/"+url_Objects_Space;

    lstcon;
    @track openGame1 = false;
    @track completeGame1 = false;
    @track lockGame1 = false;
    @track openGame2 = false;
    @track completeGame2 = false;
    @track lockGame2 = false;
    @track openGame3 = false;
    @track completeGame3 = false;
    @track lockGame3 = false;
    @track openGame4 = false;
    @track completeGame4 = false;
    @track lockGame4 = false;
    @track openGame5 = false;
    @track completeGame5 = false;
    @track lockGame5 = false;
    @track openGame6 = false;
    @track completeGame6 = false;
    @track lockGame6 = false;
    @track openGame7 = false;
    @track completeGame7 = false;
    @track lockGame7 = false;
    @track openGame8 = false;
    @track completeGame8 = false;
    @track lockGame8 = false;
    @track hasMouse = false;
    @track macTouch = false;
    @track restrictGame = false;
    @api games_text_1 = "Welcome to your personal brain game dashboard";
    @api games_text_2 = "The tiles below represent games that you can play. Click a tile to launch the game. Try to finish all of the games in 14 days or less.";
    @api games_text_2_1 = "A game available to play. Play these first.";
    @api games_text_2_2 = "A locked game. These will unlock as you play more.";
    @api games_text_2_3 = "Note: Not all games are optimized to play easily on a smartphone screen. We recommend using a tablet, laptop, or desktop computer for the games on this page.";
    @api games_text_2_4 = "A game you have already completed. You can play these again in the future.";
    @api game_name_1 = "Word Pairs";
    @api game_name_2 = "React";
    @api game_name_3 = "Shapes";
    @api game_name_4 = "Focus";
    @api game_name_5 = "​Faces and Names Stacks";
    @api game_name_6 = "Switching";
    @api game_name_7 = "Keep Track";
    @api game_name_8 = "Objects";
    @api game_name_9 = "Objects - Time";
    @api game_name_10 = "Objects - Space";
    @api game_name_c = "Coming Soon...";
    @api game_three_min = "3 min";
    @api game_five_min = "5 min";
    @api game_ten_min = "10 min";
    @api game_fifteen_min = "15 min";
    @api game_twentyFive = "25 min";
    @api strTitle = "";
    @api game_block_error ="These games are only available on a desktop or laptop. Versions will be released soon for mobile phones and tablets.<br><br>Sorry for the inconvenience."



    connectedCallback() {
        getCurrentContact()
            .then(result => {

               // alert('scree width = ' + screen.width + ' document width = ' + document.width);
               // alert('scroll = ' + document.documentElement.scrollHeight + ' document height = ' + window.innerHeight);
                if(this.getCookie('macTouch') == 'true'){
                    this.macTouch = true;
                    console.log('macTouch1 =' + this.macTouch );
                }else{
                    this.macTouch = false;
                    console.log('macTouch2 =' + this.macTouch );
                }

                this.lstcon = result;
                this.error = undefined;
                if (this.lstcon.Deary_Simple_And_Complex_Reaction_Time__c == "Opened") {
                    this.template.querySelector('.game2').className = 'opened game-tiles game2';
                    this.openGame2 = true;
                }
                else if (this.lstcon.Deary_Simple_And_Complex_Reaction_Time__c == "Completed") {
                    this.template.querySelector('.game2').className = 'completed game-tiles game2';
                    this.completeGame2 = true;
                }
                else if (this.lstcon.Deary_Simple_And_Complex_Reaction_Time__c == "Locked") {
                    this.template.querySelector('.game2').className = 'locked game-tiles game2';
                    this.lockGame2 = true;
                }

                if (this.lstcon.Face_Name_Associates__c == "Opened") {
                    this.template.querySelector('.game5').className = 'opened game-tiles game5';
                    this.openGame5 = true;
                }
                else if (this.lstcon.Face_Name_Associates__c == "Completed") {
                    this.template.querySelector('.game5').className = 'completed game-tiles game5';
                    this.completeGame5 = true;
                }
                else if (this.lstcon.Face_Name_Associates__c == "Locked") {
                    this.template.querySelector('.game5').className = 'locked game-tiles game5';
                    this.lockGame5 = true;
                }

                if (this.lstcon.Flanker__c == "Opened") {
                    this.template.querySelector('.game4').className = 'opened game-tiles game4';
                    this.openGame4 = true;
                }
                else if (this.lstcon.Flanker__c == "Completed") {
                    this.template.querySelector('.game4').className = 'completed game-tiles game4';
                    this.completeGame4 = true;
                }
                else if (this.lstcon.Flanker__c == "Locked") {
                    this.template.querySelector('.game4').className = 'locked game-tiles game4';
                    this.lockGame4 = true;
                }

                if (this.lstcon.Keep_Track__c == "Opened") {
                    this.template.querySelector('.game7').className = 'opened game-tiles game7';
                    this.openGame7 = true;
                }
                else if (this.lstcon.Keep_Track__c == "Completed") {
                    this.template.querySelector('.game7').className = 'completed game-tiles game7';
                    this.completeGame7 = true;
                }
                else if (this.lstcon.Keep_Track__c == "Locked") {
                    this.template.querySelector('.game7').className = 'locked game-tiles game7';
                    this.lockGame7 = true;
                }

                if (this.lstcon.Letter_Number_Sequencing__c == "Opened") {
                    this.template.querySelector('.game6').className = 'opened game-tiles game6';
                    this.openGame6 = true;
                }
                else if (this.lstcon.Letter_Number_Sequencing__c == "Completed") {
                    this.template.querySelector('.game6').className = 'completed game-tiles game6';
                    this.completeGame6 = true;
                }
                else if (this.lstcon.Letter_Number_Sequencing__c == "Locked") {
                    this.template.querySelector('.game6').className = 'locked game-tiles game6';
                    this.lockGame6 = true;
                }

                if (this.lstcon.Object_Recognition_And_Similarity__c == "Opened") {
                    this.template.querySelector('.game3').className = 'opened game-tiles game3';
                    this.openGame3 = true;
                }
                else if (this.lstcon.Object_Recognition_And_Similarity__c == "Completed") {
                    this.template.querySelector('.game3').className = 'completed game-tiles game3';
                    this.completeGame3 = true;
                }
                else if (this.lstcon.Object_Recognition_And_Similarity__c == "Locked") {
                    this.template.querySelector('.game3').className = 'locked game-tiles game3';
                    this.lockGame3 = true;
                }


                if (this.lstcon.Verbal_Paired_Associates__c == "Opened") {
                    this.template.querySelector('.game1').className = 'opened game-tiles game1';
                    this.openGame1 = true;
                }
                else if (this.lstcon.Verbal_Paired_Associates__c == "Completed") {
                    this.template.querySelector('.game1').className = 'completed game-tiles game1';
                    this.completeGame1 = true;
                }
                else if (this.lstcon.Verbal_Paired_Associates__c == "Locked") {
                    this.template.querySelector('.game1').className = 'locked game-tiles game1';
                    this.lockGame1 = true;
                }

                if (this.lstcon.Object_Discrimination__c == "Opened") {
                    this.template.querySelector('.game8').className = 'opened game-tiles game8';
                    this.openGame8 = true; 
                }
                else if (this.lstcon.Object_Discrimination__c == "Completed") {
                    this.template.querySelector('.game8').className = 'completed game-tiles game8';
                    this.completeGame8 = true;
                }
                else if (this.lstcon.Object_Discrimination__c == "Locked") {
                    this.template.querySelector('.game8').className = 'locked game-tiles game8';
                    this.lockGame8 = true;
                }

                if (this.lstcon.Object_Temporal__c == "Opened") {
                    this.template.querySelector('.game9').className = 'opened game-tiles game9';
                    this.openGame9 = true;
                }
                else if (this.lstcon.Object_Temporal__c == "Completed") {
                    this.template.querySelector('.game9').className = 'completed game-tiles game9';
                    this.completeGame9 = true;
                }
                else if (this.lstcon.Object_Temporal__c == "Locked") {
                    this.template.querySelector('.game9').className = 'locked game-tiles game9';
                    this.lockGame9 = true;
                }

                if (this.lstcon.Object_Spatial__c== "Opened") {
                    this.template.querySelector('.game10').className = 'opened game-tiles game10';
                    this.openGame10 = true;
                }
                else if (this.lstcon.Object_Spatial__c == "Completed") {
                    this.template.querySelector('.game10').className = 'completed game-tiles game10';
                    this.completeGame10 = true;
                }
                else if (this.lstcon.Object_Spatial__c == "Locked") {
                    this.template.querySelector('.game10').className = 'locked game-tiles game10';
                    this.lockGame10 = true;
                }
               return restrictExpandedGames({ Zipcode: this.lstcon.MailingPostalCode });
            })
            .then(result => {
                this.error = undefined;
                 if(this.macTouch){
                     this.restrictGame = result;
                 } 
                 console.log('macTouch: ' + this.macTouch);               
                 console.log('Postal Code: ' + this.lstcon.MailingPostalCode);
                 console.log('restrictGame: '+ result);
             })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });
 
            window.onmousemove = function() {
                this.hasMouse = true;
            }
    }


    getCookie(name) {
        var cookieString = "; " + document.cookie;
        cookieString = cookieString.replace('LSKey-c$', '');
        var parts = cookieString.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    }

   
   

   
    
    wordpairsgameClick(){
       if ("ontouchstart" in document.documentElement){
        document.cookie = 'macTouch = ' + true;
        window.location.href = this.url_wordpairsgame;
       }else{
        document.cookie = 'macTouch = ' + false;
        window.location.href = this.url_wordpairsgame;
       }

    }

    reactgameClick(e){
       if ("ontouchstart" in document.documentElement){
        document.cookie = 'macTouch = ' + true;
        window.location.href = this.url_reactgame;
       }else{
        document.cookie = 'macTouch = ' + false;
        window.location.href = this.url_reactgame;
       }
    }
    objectsClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_objects;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_objects;
        }
     }
     objects_timeClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_objects_time;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_objects_time;
        }
     }
     objects_spaceClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_objects_space;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_objects_space;
        }
     }
     flankergameClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_flankergame;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_flankergame;
        }
     }
     namesandfacesgameClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_namesandfacesgame;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_namesandfacesgame;
        }
     }
     switchinggameClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_switchinggame;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_switchinggame;
        }
     }

     keeptrackgameClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_keeptrackgame;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_keeptrackgame;
        }
     }
     shapesgameClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_shapesgame;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_shapesgame;
        }
     }

  

  

}