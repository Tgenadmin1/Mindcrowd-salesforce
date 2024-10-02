import { LightningElement, track, wire,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import community_name from '@salesforce/label/c.community_name';
import pdf from '@salesforce/resourceUrl/ConsentForTestTaker';
import Community_Url from '@salesforce/label/c.Community_Url';
import Community_language_Url from '@salesforce/label/c.Community_language_Url';
import { CurrentPageReference } from 'lightning/navigation';
import url_aboutyourbrain from '@salesforce/label/c.url_aboutyourbrain';
import url_printconsent from '@salesforce/label/c.url_printconsent';
import consent from '@salesforce/label/c.consent';
import consent_text_13 from '@salesforce/label/c.consent_text_13';
import close_btn from "@salesforce/label/c.close_btn";
import getformHandler from '@salesforce/apex/ConsentFormController.getformHandler';
import insertAB_Testing_Record from '@salesforce/apex/ConsentFormController.insertABTestingRecord';
import update_AB_Testing_Record from '@salesforce/apex/ConsentFormController.updateABTestingRecord';
import images from '@salesforce/resourceUrl/mindcrowd_style';

export default class Consent extends NavigationMixin(LightningElement) {
    image1 = images + '/images/MindCrowd-Logo-Color_Large.png';
    urlStateParameters = null;
    currentPageReference;
    
   
    
    Community_Url_printconsent = Community_Url + '/s/' + url_printconsent;
    Community_Url_pdfconsent = Community_Url + '/resource/Forms/'+consent;
    
    
    //Community_Url_pdfconsentES = Community_Url + '/resource/consentForm/mhuentelman21-022-Amendment-1-CatchmentES-ICF-050522.pdf'
    @track valueConsent = '';
    @track odd = false;
    @track even = false;

    @api consent01 = "Please click on the checkbox at the bottom of the page before pressing the 'I Agree' button.";
    @api consent02 = 'Please read the following information before agreeing to participate in this research study.';
    @api consent03 = 'This research study is conducted by Dr. Matt Huentelman at the Translational Genomics Research Institute (or TGen) in Phoenix, Arizona.';
    @api consent04 = "The purpose of this study is to understand the factors that influence how the brain ages. We are interested in factors such as your lifestyle choices, your medical or family history, and even your genetic make-up. If we better understand how the brain ages, we may be able to understand what happens to people who experience an age-related brain disease (like Alzheimer's disease).";
    @api consent05 = 'What will I have to do?';
    @api consent06 = 'You will take one attention test and one memory test, and answer a few study-related questions.';
    @api consent07 = 'How will you use my information?';
    @api consent08 = 'We will use it to study, analyze, and understand how memory works in healthy people.';
    @api consent09 = 'We may contact you again for future brain studies. Most studies will be performed online.';
    @api consent10 = 'How old do I have to be to participate?';
    @api consent11 = '18 years old or older.';
    @api consent12 = 'What are my alternatives to being in this study?';
    @api consent13 = 'This is not a treatment study. Your alternative is not to participate.';
    @api consent14 = 'Are there any risks?';
    @api consent15 = 'No';
    @api consent16 = 'Will I get paid?';
    @api consent17 = 'Does it cost me anything to participate?';
    @api consent18 = 'Will you share my study data?';
    @api consent19 = 'Sharing research data with other scientists is an important part of the research process and helps advance scientific progress. We will share de-identified data from this study with other researchers to help further research into the human brain.';
    @api consent20 = 'Will you share my personal information with other people?';
    @api consent21 = 'No, we will not share your personal information without your permission. If you consent to participate in a MindCrowd collaborative study (or have previously done so), we may share or receive identifiable data such as your name or email address with our collaborative partners. This would only be done to link your study data. Your information could also be shared with the FDA and the IRB overseeing this study.';
    @api consent22 = 'To help protect your privacy, we have obtained a Certificate of Confidentiality from the National Institutes of Health. This means researchers may refuse to give out study information that identifies you. For example, if there were a court order requesting your study records, TGen would not give out information that identifies you, unless you have consented for this use. The Certificate does permit TGen to disclose your information when:';
    @api consent23 = 'Required by Federal, State, or local laws. This excludes instances of Federal, State, or local civil, criminal, administrative, legislative, or other proceedings;';
    @api consent24 = 'You have consented to the disclosure, including for your medical treatment;';
    @api consent25 = 'Done as part of other approved research studies.';
    @api consent26 = 'A Certificate of Confidentiality does not prevent you or someone else, like a member of your family, from voluntarily sharing information about yourself or your involvement in this research. If you want your research information released to an insurer, medical care provider, or any other person not connected with the research, you must provide consent to allow the researchers to release it.';
    @api consent27 = "What if I change my mind and don't want to participate in the study anymore?";
    @api consent28 = 'Your participation is completely voluntary. You do not have to participate and you may stop at any time. Your decision will not result in any penalty or loss of benefits to which you are otherwise entitled. Please contact the Study Coordinator at crc@tgen.org to withdraw from the study.';
    @api consent29 = 'What if I have questions or comments?';
    @api consent30 = 'If you have any questions, concerns or complaints about this research, you may contact Dr. Matt Huentelman at mhuentelman@tgen.org or 602-343-8653 (24 hours).';
    @api consent31 = 'Will you contact me in the future?';
    @api consent32 = 'We may contact you in the future via email to offer you to participate in new scientific research studies. Participation in any of our studies is completely voluntary.';
    @api consent33 = 'What if I have questions about my rights in this research, have a complaint, or want to report a problem to someone besides the researcher?';
    @api consent34 = 'If you have questions about your rights as a research participant in this study or if you have questions, concerns or complaints about the research, you may contact WCG IRB at:';
    @api consent35 = '1019 39th Avenue SE Suite 120';
    @api consent36 = 'Puyallup, Washington 98374-2115';
    @api consent37 = 'Telephone:  855-818-2289';
    @api consent38 = 'E-mail:';
    @api consent39 = 'researchquestions@wcgirb.com';
    @api consent40 = 'WCG IRB is a group of people who perform independent review of research.';
    @api consent41 = 'For questions, concerns, suggestions, complaints that are not being addressed by the research team, or in case of research-related harm, please contact the TGen Office of Research Compliance at';
    @api consent42 = 'irb@tgen.org.';
    @api consent43 = 'If you have questions about your rights as a research participant in this study or if you have questions, concerns or complaints about the research, you may contact WCG IRB at:';
    @api strTitle = 'Welcome in Salesforce';
    @api consent_text_6 = 'The MindCrowd scientific study';
    @api consent_text_7 = 'Information and Frequently Asked Questions';
    @api consent_text_8 = "Please read the following information and the answers to frequently asked questions about MindCrowd.To play the free MindCrowd memory and attention game, check the box below and press I Agree.";
    @api consent_text_11 ="If you would like to participate, please check the empty box to confirm that:you are 18 years of age or older,you have read and understood the information above and want to participate in this research study, and you are not using this test to self-diagnose or predict your future risk of cognitive decline, Alzheimer’s disease, or any other dementia.";
    @api consent_text_15 = 'I AGREE';
    @api consent_text_12  ='If you would like a copy of the consent form for your records,';
    @api consent_text_13 = 'click here to download';
    @api consent_text_14 = 'one';
    @api ConsentPDF = "mhuentelman21-022-Amendment-1-Catchment-ICF-050522.pdf";
    label = {consent,consent_text_13,close_btn};
    @track areDetailsVisibleA=false;
    @track areDetailsVisibleB=false;
    recId;
    
    // @wire(CurrentPageReference)
    // getStateParameters(currentPageReference) {
    //     if (currentPageReference) {
    //     console.log('cmpgn_tg =', cmpgn_tg);
    //     if(cmpgn_tg !='' && cmpgn_tg !=null){
    //         localStorage.setItem('campaignCode', cmpgn_tg);
    //     }
    //     console.log('localStorage.getItem campaignCode =', localStorage.getItem('campaignCode'));
    // }
    // }
connectedCallback(){
    let randomNumber = parseInt(Math.random() * 10).toString();
    console.log('randomNumber==>',randomNumber);
    if(randomNumber % 2 ==0){
        this.even = true;
        console.log('Number is even');
    }else{
        this.odd = true;
        console.log('Number is odd');
    }
    console.log('sssssssssss = ', window.location.pathname);
    getformHandler()
        .then(result => {
            if(result == 'A' || result == 'C')
                this.areDetailsVisibleA = true;

            if(result == 'B' || result == 'D')
                this.areDetailsVisibleB = true;

            if(result == 'A' || result == 'B')
                this.myMethod(result);
                     
             this.error = undefined;                     
            })
            .catch(error => {
            this.error = error;
            this.areDetailsVisibleA = undefined;
            this.areDetailsVisibleB = undefined;

        });
    }
    myMethod(value){
        let val=value;
        insertAB_Testing_Record({variant : val})
        .then(response=>{
            this.recId = response;
            localStorage.setItem('AbTestId',response);            
             this.error = undefined;         
            })
            .catch(error => {
            this.error = error;
        });

    }
    renderedCallback() {
        
        if (document.getElementsByTagName("html")[0].getAttribute("lang") == 'en-US') {
            this.valueConsent = 'en_US';
            this.EnglishConsentPrint = true;
            console.log('in English',this.valueConsent);
        }
        else if (document.getElementsByTagName("html")[0].getAttribute("lang") == 'es') {
            this.valueConsent = 'es';
            this.SpanishConsentPrint = true;
            console.log('in Spanish',this.valueConsent);
        }
       


        for (let i = 0; i < localStorage.length; i++){  
        
            if(localStorage.key(i)=='ipdata' || localStorage.key(i)=='campaigncode' || localStorage.key(i)=='eventId' || localStorage.key(i)=='studiesId' || localStorage.key(i)=='subIdToStoreLocal'
             || localStorage.key(i)=='utmsource' || localStorage.key(i)=='utmmedium') {
                
                // Do nothing
                //console.log('in store local',localStorage.key(i));
            }else{
                //console.log('delete store local',localStorage.key(i));
                localStorage.removeItem(localStorage.key(i));
            }
        }
        localStorage.setItem('LastPage', document.URL);
        localStorage.setItem('attcurrentScreen', 0);
        localStorage.setItem('memcurrentScreen', 0);
        localStorage.setItem('c__id', '');
        localStorage.setItem('pGameInfoCreated', '');
        localStorage.setItem('pGameId', '');
        localStorage.setItem('consent', false);
        localStorage.setItem('MemoryLastPage', '');
        localStorage.setItem('currentScreent', 0);
        localStorage.setItem('userinfo', false);
        
        console.log('localStorage.getItem campaignCode 1 =', localStorage.getItem('campaigncode'));
        //localStorage.setItem('campaignCode', cmpgn_tg);
        if(cmpgn_tg !='' && cmpgn_tg !=null){

            localStorage.setItem('campaigncode', cmpgn_tg);
            console.log('localStorage.getItem campaignCode 2 =', localStorage.getItem('campaigncode'));

        }
       

    }

    @track termAndCOndition = false;
    @track isModalOpen = false;
    @track ErrorModalOpen = false;
    @track EnglishConsentPrint = false;
    @track SpanishConsentPrint = false;

    tempLang;

    

    

    openModal() {
        this.isModalOpen = false;
        document.querySelector("body").style.overflow = 'hidden';
    }
    closeModal() {
        this.isModalOpen = false;
        this.ErrorModalOpen = false;
        this.isSubmitBtnDisable = false;
    }
    submitDetails() {
        this.isModalOpen = false;
        document.querySelector("body").style.overflow = 'visible';
        this.isModalOpen = false;
    }

    get optionsConsent() {
        return [
            // { label: 'English', value: 'English' },
            // { label: 'Español', value: 'Español' }
            { label: 'English', value: 'en_US' }
            // { label: 'Español', value: 'es' }
        ];

    }

   

    handleChangeConsent(event) {
        this.valueConsent = event.detail.value;
        this.tempLang = event.detail.value;
        this.tempEnLang;
        if (document.getElementsByTagName("html")[0].getAttribute("lang") == "en-US") {
            this.tempEnLang = "en_US";
        } else {
            this.tempEnLang = "es";
        }
        if (this.tempLang == "en_US" && this.tempEnLang != this.tempLang) {
            window.location.href = Community_language_Url + "/s/consent";
        } else if (this.tempLang == "es" && document.getElementsByTagName("html")[0].getAttribute("lang") != this.tempLang) {
            window.location.href = Community_language_Url + "/s/consent?language=es";
        }

    }
    checkTerm(event) {
        this.termAndCOndition = event.detail.checked;
    }
    faqClick() {
        window.location = Community_Url + "/s/faq";
    }
    save() {

        try {
            this.isSubmitBtnDisable = true;
            if (!this.termAndCOndition) {
                this.ErrorModalOpen = true;
                document.querySelector("body").style.overflow = 'visible';
            }
            else {
                    if(this.recId != undefined)
                    this.updateABrecord(this.recId);
                   if (document.getElementsByTagName("html")[0].getAttribute("lang") == 'en-US') {
                    this.tempLang = 'en_US';
                } else {
                    this.tempLang = document.getElementsByTagName("html")[0].getAttribute("lang");
                }
                localStorage.setItem('isModalOpenC', true);
                localStorage.setItem('language', this.tempLang);
                localStorage.setItem('consent', this.termAndCOndition);
                //localStorage.setItem('LastPage',  document.URL);
                localStorage.setItem('LastPage', Community_Url + window.location.pathname);
                window.location.href = Community_Url + "/s/" + url_aboutyourbrain;
                this.isSubmitBtnDisable = false;
            }
        }
        catch (e) {
            isSubmitBtnDisable = false;
        }
    }

    printconsent() {
        const strUrl = Community_Url + "/s/printconsent";
        const html = $('#durl').load(strUrl);
    }

    updateABrecord(value){
        let rId=value;
        update_AB_Testing_Record({recid : rId})
        .then(response=>{
            this.error = undefined;         
            })
            .catch(error => {
            this.error = error;
        });
    }

}