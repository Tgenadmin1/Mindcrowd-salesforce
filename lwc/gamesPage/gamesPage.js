import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import community_name from '@salesforce/label/c.community_name';
import Community_Url from '@salesforce/label/c.Community_Url';

import DBS_intermediate_form from '@salesforce/label/c.DBS_intermediate_form';
import Bean_game_intermediate from '@salesforce/label/c.Bean_game_intermediate';
import APOE_intermediate_form from '@salesforce/label/c.APOE_intermediate_form';


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
import url_me_fakeNewsTest from '@salesforce/label/c.url_me_fakeNewsTest';
import url_me_speechTask from '@salesforce/label/c.url_me_speechTask';
import url_me_digitSymbol from '@salesforce/label/c.url_me_digitSymbol';
import url_me_camelandcactus from '@salesforce/label/c.url_me_CamelandCactus';
import WordPairs from '@salesforce/label/c.game_name_1';
import React from '@salesforce/label/c.game_name_2';
import Shapes from '@salesforce/label/c.game_name_3';
import Focus from '@salesforce/label/c.game_name_4';
import FacesNames from '@salesforce/label/c.game_name_5';
import Switching from '@salesforce/label/c.game_name_6';
import KeepTrack from '@salesforce/label/c.game_name_7';
import Objects from '@salesforce/label/c.game_name_8';
import ObjectsTime from '@salesforce/label/c.game_name_9';
import ObjectsSpace from '@salesforce/label/c.game_name_10';
import BeanGame from '@salesforce/label/c.game_name_11';
import DBS from '@salesforce/label/c.game_name_12';
import APOE from '@salesforce/label/c.game_name_13';
import FakeNews from '@salesforce/label/c.game_name_14';
import SpeechTask from '@salesforce/label/c.game_name_15';
import CamelandCactus from '@salesforce/label/c.game_name_18';
import DigitSymbol from '@salesforce/label/c.game_name_17';
import game_time_3_min from '@salesforce/label/c.game_time_3_min';
import game_time_5_min from '@salesforce/label/c.game_time_5_min';
import game_time_10_min from '@salesforce/label/c.game_time_10_min';
import game_time_20_min from '@salesforce/label/c.game_time_20_min';
import remote from '@salesforce/label/c.remote';


import hasDuplicateRecords from "@salesforce/apex/ContactController.hasDuplicateRecords";
import getCurrentContact from '@salesforce/apex/CustomLoginController.getCurrentContact';
import restrictExpandedGames from '@salesforce/apex/CustomLoginController.restrictExpandedGames';
import getCustomSettingValues from '@salesforce/apex/ContactController.getCustomSettingValues';

export default class gamesPage extends NavigationMixin(LightningElement) {
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

    url_fakenewstestgame = Community_Url + "/s/"+url_me_fakeNewsTest;
    url_dbsform = Community_Url + "/s/"+ DBS_intermediate_form;
    url_beangameform = Community_Url + "/s/"+ Bean_game_intermediate;
    url_apoeform = Community_Url + "/s/"+ APOE_intermediate_form;
    url_speechTask = Community_Url + "/s/"+url_me_speechTask;
    url_digitSymbol = Community_Url + "/s/"+url_me_digitSymbol;
    url_CamelandCactus = Community_Url + "/s/"+url_me_camelandcactus;

    lstcon;
    customSettingValues;
    @api BEANGAME_URL = '';
    @api DBS_URL = '';
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
    @track openGame9 = false;
    @track completeGame9 = false;
    @track lockGame9 = false;
    @track openGame10 = false;
    @track completeGame10 = false;
    @track lockGame10 = false;
    @track openGame11 = false;
    @track completeGame11 = false;
    @track lockGame11 = false;
    @track openGame12 = false;
    @track completeGame12 = false;
    @track lockGame12 = false;
    @track openGame13 = false;
    @track completeGame13 = false;
    @track lockGame13 = false;
    @track openGame14 = false;
    @track completeGame14 = false;
    @track lockGame14 = false;
    @track openGame15 = false;
    @track completeGame15 = false;
    @track lockGame15 = false;
    @track openGame18 = false;
    @track completeGame18 = false;
    @track lockGame18 = false;
    @track openGame17 = false;
    @track completeGame17 = false;
    @track lockGame17 = false;
    @track hasMouse = false;
    @track macTouch = false;
    @track restrictGame = false;
    @track gameItems = [];
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
    @api game_name_11 = "Bean game";
    @api game_name_12 = "DBS";
    @api game_name_13 = "APOE";
    @api game_name_14 = "Fake News Test"
    @api game_name_15 = "Speech Task"
    @api game_name_18 = "Camel and Cactus"
    @api game_name_c = "Coming Soon...";
    @api game_name_17 = "Digit Symbol Matching Test"
    @api game_three_min = "3 min";
    @api game_five_min = "5 min";
    @api game_ten_min = "10 min";
    @api game_fifteen_min = "15 min";
    @api game_twentyFive = "25 min";
    @api game_Remote;
    @api strTitle = "";
    @api game_block_error ="These games are only available on a desktop or laptop. Versions will be released soon for mobile phones and tablets.<br><br>Sorry for the inconvenience."

    @track hideGame12 = false;
    @track hideGame13 = false;
    @track hideGame16 = false;


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
                console.log('this.lstcon: '+JSON.stringify(this.lstcon));
                this.error = undefined;
                const gameNames = [Focus,Objects,ObjectsTime,ObjectsSpace,WordPairs,React,FacesNames,Switching,KeepTrack,Shapes,FakeNews,SpeechTask,BeanGame,DBS,APOE,DigitSymbol,CamelandCactus];
                const gameClasses = ['game4','game8','game9','game10','game1','game2','game5','game6','game7','game3','game14','game15','game11','game12','game13','game17','game18'];
                const gameTimes = [game_time_3_min,game_time_5_min,game_time_10_min,game_time_5_min,game_time_5_min,game_time_5_min,game_time_20_min,game_time_10_min,game_time_10_min,game_time_10_min,game_time_10_min,game_time_10_min,remote,remote,remote,game_time_3_min,game_time_3_min];                
                const gamesOpenArray = [];
                const gameLockedArray = [];
                const gameCompletedArray = [];
                for (let i = 0; i < gameNames.length; i++) {
                   const game = {
                       id: i,
                       open: true,
                       complete: false,
                       lock: false,
                       gametime: gameTimes[i],
                       gamename: gameNames[i],                      
                       classname: 'opened game-tiles '+gameClasses[i]
                   };
                gamesOpenArray.push(game);
                }
                for (let i = 0; i < gameNames.length; i++) {
                const game = {
                    id: i,
                    open: false,
                    complete: true,
                    lock: false,
                    gametime: gameTimes[i],                   
                    gamename: gameNames[i],
                    classname: 'completed game-tiles '+gameClasses[i]
                };
                gameCompletedArray.push(game);
                }
                for (let i = 0; i < gameNames.length; i++) {
                    const game = {
                        id: i,
                        open: false,
                        complete: false,
                        lock: true,
                        gametime: gameTimes[i],                    
                        gamename: gameNames[i],
                        classname: 'locked game-tiles '+ gameClasses[i]
                    };
                gameLockedArray.push(game);
                }
                console.log('gamesOpenArray'+gamesOpenArray );
                const finalLockedArray = [];
                const finalCompletedArray = [];
                if (this.lstcon.Deary_Simple_And_Complex_Reaction_Time__c == "Opened") {
                    //this.template.querySelector('.game2').className = 'opened game-tiles game2';
                    //this.openGame2 = true;
                    this.gameItems.push(gamesOpenArray[5]);
                }
                else if (this.lstcon.Deary_Simple_And_Complex_Reaction_Time__c == "Completed") {
                    //this.template.querySelector('.game2').className = 'completed game-tiles game2';
                    //this.completeGame2 = true;
                    finalCompletedArray.push(gameCompletedArray[5]);
                }
                else if (this.lstcon.Deary_Simple_And_Complex_Reaction_Time__c == "Locked") {
                    //this.template.querySelector('.game2').className = 'locked game-tiles game2';
                    //this.lockGame2 = true;
                    finalLockedArray.push(gameLockedArray[5]);
                }

                if (this.lstcon.Face_Name_Associates__c == "Opened") {
                    //this.template.querySelector('.game5').className = 'opened game-tiles game5';
                    //this.openGame5 = true;
                    this.gameItems.push(gamesOpenArray[6]);
                }
                else if (this.lstcon.Face_Name_Associates__c == "Completed") {
                    //this.template.querySelector('.game5').className = 'completed game-tiles game5';
                    //this.completeGame5 = true;
                    finalCompletedArray.push(gameCompletedArray[6]);
                }
                else if (this.lstcon.Face_Name_Associates__c == "Locked") {
                    //this.template.querySelector('.game5').className = 'locked game-tiles game5';
                    //this.lockGame5 = true;
                    finalLockedArray.push(gameLockedArray[6]);
                }

                if (this.lstcon.Flanker__c == "Opened") {
                    //this.template.querySelector('.game4').className = 'opened game-tiles game4';
                    //this.openGame4 = true;
                    this.gameItems.push(gamesOpenArray[0]);
                }
                else if (this.lstcon.Flanker__c == "Completed") {
                    //this.template.querySelector('.game4').className = 'completed game-tiles game4';
                    //this.completeGame4 = true;
                    finalCompletedArray.push(gameCompletedArray[0]);
                }
                else if (this.lstcon.Flanker__c == "Locked") {
                    //this.template.querySelector('.game4').className = 'locked game-tiles game4';
                    //this.lockGame4 = true;
                    finalLockedArray.push(gameLockedArray[0]);
                }

                if (this.lstcon.Keep_Track__c == "Opened") {
                    //this.template.querySelector('.game7').className = 'opened game-tiles game7';
                    //this.openGame7 = true;
                    this.gameItems.push(gamesOpenArray[8]);
                }
                else if (this.lstcon.Keep_Track__c == "Completed") {
                    //this.template.querySelector('.game7').className = 'completed game-tiles game7';
                    //this.completeGame7 = true;
                    finalCompletedArray.push(gameCompletedArray[8]);
                }
                else if (this.lstcon.Keep_Track__c == "Locked") {
                    //this.template.querySelector('.game7').className = 'locked game-tiles game7';
                    //this.lockGame7 = true;
                    finalLockedArray.push(gameLockedArray[8]);
                }

                if (this.lstcon.Letter_Number_Sequencing__c == "Opened") {
                    //this.template.querySelector('.game6').className = 'opened game-tiles game6';
                    //this.openGame6 = true;
                    this.gameItems.push(gamesOpenArray[7]);
                }
                else if (this.lstcon.Letter_Number_Sequencing__c == "Completed") {
                    //this.template.querySelector('.game6').className = 'completed game-tiles game6';
                    //this.completeGame6 = true;
                    finalCompletedArray.push(gameCompletedArray[7]);
                }
                else if (this.lstcon.Letter_Number_Sequencing__c == "Locked") {
                    //this.template.querySelector('.game6').className = 'locked game-tiles game6';
                    //this.lockGame6 = true;
                    finalLockedArray.push(gameLockedArray[7]);
                }

                if (this.lstcon.Object_Recognition_And_Similarity__c == "Opened") {
                    //this.template.querySelector('.game3').className = 'opened game-tiles game3';
                    //this.openGame3 = true;
                    this.gameItems.push(gamesOpenArray[9]);
                }
                else if (this.lstcon.Object_Recognition_And_Similarity__c == "Completed") {
                    //this.template.querySelector('.game3').className = 'completed game-tiles game3';
                    //this.completeGame3 = true;
                    finalCompletedArray.push(gameCompletedArray[9]);
                }
                else if (this.lstcon.Object_Recognition_And_Similarity__c == "Locked") {
                    //this.template.querySelector('.game3').className = 'locked game-tiles game3';
                    //this.lockGame3 = true;
                    finalLockedArray.push(gameLockedArray[9]);
                }


                if (this.lstcon.Verbal_Paired_Associates__c == "Opened") {
                    //this.template.querySelector('.game1').className = 'opened game-tiles game1';
                    //this.openGame1 = true;
                    this.gameItems.push(gamesOpenArray[4]);
                }
                else if (this.lstcon.Verbal_Paired_Associates__c == "Completed") {
                    //this.template.querySelector('.game1').className = 'completed game-tiles game1';
                    //this.completeGame1 = true;
                    finalCompletedArray.push(gameCompletedArray[4]);
                }
                else if (this.lstcon.Verbal_Paired_Associates__c == "Locked") {
                    //this.template.querySelector('.game1').className = 'locked game-tiles game1';
                    //this.lockGame1 = true;
                    finalLockedArray.push(gameLockedArray[4]);
                }

                if (this.lstcon.Object_Discrimination__c == "Opened") {
                    //this.template.querySelector('.game8').className = 'opened game-tiles game8';
                    //this.openGame8 = true; 
                    this.gameItems.push(gamesOpenArray[1]);
                }
                else if (this.lstcon.Object_Discrimination__c == "Completed") {
                    //this.template.querySelector('.game8').className = 'completed game-tiles game8';
                    //this.completeGame8 = true;
                    finalCompletedArray.push(gameCompletedArray[1]);
                }
                else if (this.lstcon.Object_Discrimination__c == "Locked") {
                    //this.template.querySelector('.game8').className = 'locked game-tiles game8';
                    //this.lockGame8 = true;
                    finalLockedArray.push(gameLockedArray[1]);
                }

                if (this.lstcon.Object_Temporal__c == "Opened") {
                    //this.template.querySelector('.game9').className = 'opened game-tiles game9';
                    //this.openGame9 = true;
                    this.gameItems.push(gamesOpenArray[2]);
                }
                else if (this.lstcon.Object_Temporal__c == "Completed") {
                    //this.template.querySelector('.game9').className = 'completed game-tiles game9';
                    //this.completeGame9 = true;
                    finalCompletedArray.push(gameCompletedArray[2]);
                }
                else if (this.lstcon.Object_Temporal__c == "Locked") {
                    //this.template.querySelector('.game9').className = 'locked game-tiles game9';
                    //this.lockGame9 = true;
                    finalLockedArray.push(gameLockedArray[2]);
                }

                if (this.lstcon.Object_Spatial__c== "Opened") {
                    //this.template.querySelector('.game10').className = 'opened game-tiles game10';
                    //this.openGame10 = true;
                    this.gameItems.push(gamesOpenArray[3]);
                }
                else if (this.lstcon.Object_Spatial__c == "Completed") {
                    //this.template.querySelector('.game10').className = 'completed game-tiles game10';
                    //this.completeGame10 = true;
                    finalCompletedArray.push(gameCompletedArray[3]);
                }
                else if (this.lstcon.Object_Spatial__c == "Locked") {
                    //this.template.querySelector('.game10').className = 'locked game-tiles game10';
                    //this.lockGame10 = true;
                    finalLockedArray.push(gameLockedArray[3]);
                }

                if (this.lstcon.Speech_Task__c == "Opened") {
                    //this.template.querySelector('.game15').className = 'opened game-tiles game15';
                    //this.openGame15 = true;
                    this.gameItems.push(gamesOpenArray[11]);
                }
                else if (this.lstcon.Speech_Task__c == "Completed") {
                    //this.template.querySelector('.game15').className = 'completed game-tiles game15';
                    //this.completeGame15 = true;
                    finalCompletedArray.push(gameCompletedArray[11]);
                }   
                else if (this.lstcon.Speech_Task__c == "Locked") {
                    //this.template.querySelector('.game15').className = 'locked game-tiles game15';
                    //this.lockGame15 = true;
                    finalLockedArray.push(gameLockedArray[11]);
                }
                
                if (this.lstcon.Fake_News_Test__c == "Opened") {
                    //this.template.querySelector('.game14').className = 'opened game-tiles game14';
                    //this.openGame14 = true;
                    this.gameItems.push(gamesOpenArray[10]);
                } 
                else if (this.lstcon.Fake_News_Test__c == "Completed") {
                    //this.template.querySelector('.game14').className = 'completed game-tiles game14';
                    //this.completeGame14 = true;
                    finalCompletedArray.push(gameCompletedArray[10]);
                } 
                else if (this.lstcon.Fake_News_Test__c == "Locked") {
                    //this.template.querySelector('.game14').className = 'locked game-tiles game14';
                    //this.lockGame14 = true;
                    finalLockedArray.push(gameLockedArray[10]);
                }
                
                if (this.lstcon.Bean_Game__c == "Opened") {
                    //this.template.querySelector('.game11').className = 'opened game-tiles game11';
                    //this.openGame11 = true;
                    this.gameItems.push(gamesOpenArray[12]);            
                } 
                else if (this.lstcon.Bean_Game__c == "Completed") {
                    //this.template.querySelector('.game11').className = 'completed game-tiles game11';
                    //this.completeGame11 = true;
                    finalCompletedArray.push(gameCompletedArray[12]);
                } 
                else if (this.lstcon.Bean_Game__c == "Locked") {
                    //this.template.querySelector('.game11').className = 'locked game-tiles game11';
                    //this.lockGame11 = true;
                    finalLockedArray.push(gameLockedArray[12]);
                }

                if (this.lstcon.Digit_Symbol_Matching_Test__c == "Opened") {
                    //this.template.querySelector('.game11').className = 'opened game-tiles game11';
                    //this.openGame11 = true;
                    this.gameItems.push(gamesOpenArray[15]);            
                } 
                else if (this.lstcon.Digit_Symbol_Matching_Test__c == "Completed") {
                    //this.template.querySelector('.game11').className = 'completed game-tiles game11';
                    //this.completeGame11 = true;
                    finalCompletedArray.push(gameCompletedArray[15]);
                } 
                else if (this.lstcon.Digit_Symbol_Matching_Test__c == "Locked") {
                    //this.template.querySelector('.game11').className = 'locked game-tiles game11';
                    //this.lockGame11 = true;
                    finalLockedArray.push(gameLockedArray[15]);
                }
                if (this.lstcon.Camel_and_Cactus__c == "Opened") {
                    //this.template.querySelector('.game11').className = 'opened game-tiles game11';
                    //this.openGame11 = true;
                    this.gameItems.push(gamesOpenArray[16]);            
                } 
                else if (this.lstcon.Camel_and_Cactus__c == "Completed") {
                    //this.template.querySelector('.game11').className = 'completed game-tiles game11';
                    //this.completeGame11 = true;
                    finalCompletedArray.push(gameCompletedArray[16]);
                } 
                else if (this.lstcon.Camel_and_Cactus__c == "Locked") {
                    //this.template.querySelector('.game11').className = 'locked game-tiles game11';
                    //this.lockGame11 = true;
                    finalLockedArray.push(gameLockedArray[16]);
                }

                const campaigns = ["DBS", "APOE"];
                hasDuplicateRecords({ conId: this.lstcon.Id, campaign: campaigns })
                .then(result => {                  
                        console.log('(result: ' + JSON.stringify(result));
                        if (result[campaigns[0]]=="Y" && result[campaigns[1]]=="Y") {
                            //this.template.querySelector('.game13').className = 'completed game-tiles game13'; 
                            //this.template.querySelector('.game12').className = 'completed game-tiles game12';  
                            //this.completeGame13 = true;   
                            //this.completeGame12 = true;  
                            this.hideGame16 = true;
                            finalCompletedArray.push(gamesOpenArray[13]);   
                            finalCompletedArray.push(gamesOpenArray[14]);
                            this.gameItems = [...this.gameItems, ...finalCompletedArray, ...finalLockedArray];
                        }
                        else if (result[campaigns[0]]=="Y" && result[campaigns[1]]=="N") {
                            //this.template.querySelector('.game12').className = 'completed game-tiles game12';
                            //this.completeGame12 = true;                                 
                            //this.hideGame13 = true;
                            finalCompletedArray.push(gameCompletedArray[13]);
                            this.gameItems = [...this.gameItems, ...finalCompletedArray, ...finalLockedArray];
                        }
                        else if (result[campaigns[0]]=="N" && result[campaigns[1]]=="Y") {
                            //this.template.querySelector('.game13').className = 'completed game-tiles game13';
                            //this.completeGame13 = true;                             
                            //this.hideGame12 = true;
                            finalCompletedArray.push(gameCompletedArray[14]);
                            this.gameItems = [...this.gameItems, ...finalCompletedArray, ...finalLockedArray];
                        }
                        else {                            
                            getCustomSettingValues()
                                .then(result => {
                                    this.customSettingValues = result;
                                                const lang= document.getElementsByTagName("html")[0].getAttribute("lang");
                                                console.log(lang);
                                                if((lang=='en-US' && this.customSettingValues[0].CurrRunnCampEnglish__c=='APOE') || (lang=='es' && this.customSettingValues[0].CurrRunnCampSpanish__c=='APOE')){
                                                    //this.template.querySelector('.game13').className = 'opened game-tiles game13';
                                                    //this.openGame13 = true;
                                                    //this.hideGame12 = true;
                                                    this.gameItems.push(gamesOpenArray[14]);                                                           
                                                }                            
                                                if((lang=='en-US' && this.customSettingValues[0].CurrRunnCampEnglish__c=='DBS') || (lang=='es' && this.customSettingValues[0].CurrRunnCampSpanish__c=='DBS')){
                                                    //this.template.querySelector('.game12').className = 'opened game-tiles game12';
                                                    //this.openGame12 = true;
                                                    //this.hideGame13 = true;
                                                    this.gameItems.push(gamesOpenArray[13]);   
                                                } 
                                                this.gameItems = [...this.gameItems, ...finalCompletedArray, ...finalLockedArray];
                                })
                                .catch(error => {
                                    console.error('Error fetching custom setting values:', error);
                                });
                        }   
                        
                        console.log('this.gameItems'+JSON.stringify(this.gameItems));
                })
                .catch(error => {
                    this.error = error;
                    console.log(this.error );
                });
            

                /*hasDuplicateRecord({ conId: this.lstcon.Id,  campaign: 'bean game'})
                .then(result => {
                        if(result) {
                        console.log('bean: ' + result);
                        console.log('typeof bean:' + typeof result);
                        this.template.querySelector('.game11').className = 'completed game-tiles game11';
                        this.completeGame11 = true;                        
                    }
                    else{
                        this.template.querySelector('.game11').className = 'opened game-tiles game11';
                        this.openGame11 = true;
                    }
                 
                })
                .catch(error => {
                    this.error = error;
                });*/   
               return restrictExpandedGames({ Zipcode: this.lstcon.MailingPostalCode });
            })
            .then(result => {
                this.error = undefined;                
                 if(this.macTouch){
                     this.restrictGame = result;   
                 }                
             })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
                console.log(this.error );
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

    gameClick(event){
        const clickedElement = event.currentTarget;
        let url;
        if(clickedElement.classList.contains('game4')){
            url = this.url_flankergame;
        }
        else if(clickedElement.classList.contains('game8')){
            url = this.url_objects;
        }   
        else if(clickedElement.classList.contains('game9')){
            url = this.url_objects_time;
        } 
        else if(clickedElement.classList.contains('game10')){
            url = this.url_objects_space;
        } 
        else if(clickedElement.classList.contains('game1')){
            url = this.url_wordpairsgame;
        } 
        else if(clickedElement.classList.contains('game2')){
            url = this.url_reactgame;
        } 
        else if(clickedElement.classList.contains('game5')){
            url = this.url_namesandfacesgame;
        } 
        else if(clickedElement.classList.contains('game6')){
            url = this.url_switchinggame;
        } 
        else if(clickedElement.classList.contains('game7')){
            url = this.url_keeptrackgame;
        } 
        else if(clickedElement.classList.contains('game3')){
            url = this.url_shapesgame;
        } 
        else if(clickedElement.classList.contains('game14')){
            url = this.url_fakenewstestgame;
        } 
        else if(clickedElement.classList.contains('game15')){
            url = this.url_speechTask;
        } 
        else if(clickedElement.classList.contains('game11')){
            url = this.url_beangameform;
        } 
        else if(clickedElement.classList.contains('game12')){
            url = this.url_dbsform;
        } 
        else if(clickedElement.classList.contains('game13')){
            url = this.url_apoeform;
        }
        else if(clickedElement.classList.contains('game17')){
            url = this.url_digitSymbol;
        } 
        else if(clickedElement.classList.contains('game18')){
            url = this.url_CamelandCactus;
        } 
        if ("ontouchstart" in document.documentElement){
            document.cookie = 'macTouch = ' + true;
            window.location.href = url;
        }
        else{
            document.cookie = 'macTouch = ' + false;
            window.location.href = url;
        }
    }   
    
   /* wordpairsgameClick(){
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

    BeangameClick() {
        if ("ontouchstart" in document.documentElement){
            document.cookie = 'macTouch = ' + true;
            window.location.href = this.url_beangameform;
        }else{
            document.cookie = 'macTouch = ' + false;
            window.location.href = this.url_beangameform;
        }
    }
  
    DBSgameClick(){
        if ("ontouchstart" in document.documentElement){
            document.cookie = 'macTouch = ' + true;
            window.location.href = this.url_dbsform;
        }else{
            document.cookie = 'macTouch = ' + false;
            window.location.href = this.url_dbsform;
        }

    }
    APOEgameClick(){
        if ("ontouchstart" in document.documentElement){
            document.cookie = 'macTouch = ' + true;
            window.location.href = this.url_apoeform;
        }else{
            document.cookie = 'macTouch = ' + false;
            window.location.href = this.url_apoeform;
        }

    }
    FakenewstestClick(){
        if ("ontouchstart" in document.documentElement){            
         document.cookie = 'macTouch = ' + true;    
         window.location.href = this.url_fakenewstestgame;    
        }else{
         document.cookie = 'macTouch = ' + false;  
         window.location.href = this.url_fakenewstestgame;       
        }        
     }
     speechTaskClick(){
        if ("ontouchstart" in document.documentElement){
         document.cookie = 'macTouch = ' + true;
         window.location.href = this.url_speechTask;
        }else{
         document.cookie = 'macTouch = ' + false;
         window.location.href = this.url_speechTask;
        }
     }*/

}