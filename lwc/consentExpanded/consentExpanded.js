import { LightningElement, track, wire,api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import Community_Url from '@salesforce/label/c.Community_Url';
import fetchRecord from '@salesforce/apex/ContactController.fetchContactFields1';
import updateConsent from '@salesforce/apex/ContactController.updateConsent';
import close_btn from "@salesforce/label/c.close_btn";
import url_decline from '@salesforce/label/c.live_URL_9';
export default class ConsentExpanded extends LightningElement {
    @api consentExpanded01='Taking part in this research is voluntary.  You may decide not to participate, or you may leave the study at any time.  Your decision will not result in any penalty or loss of benefits to which you are otherwise entitled.';
    @api consentExpanded02='If you have any questions, concerns, or complaints or think this research has hurt you, talk to the research team at the phone number(s) listed in this document.';
    @api consentExpanded03='This consent information sheet addendum has more information about the research study.  It may add to or change the information in the consent form you signed at the start of this study.  ';
    @api consentExpanded04='You are being asked to participate in a research study. Please read the following information before agreeing to participate.';
    @api consentExpanded05='This research study is being conducted by Dr. Matt Huentelman at the Translational Genomics Research Institute (TGen). The purpose of this study is to understand how the brain ages. ';
    @api consentExpanded06='What will I have to do?';
    @api consentExpanded07='You will be asked to create an account and complete several online brain tests. We may send you requests to complete these online tests several times during your participation in MindCrowd. ';
    @api consentExpanded08='Are there any risks?';
    @api consentExpanded09='No.';
    @api consentExpanded10='Will I get paid?';
    @api consentExpanded11='You will receive $100 for the completion of all brain tests. To qualify, you must also participate in our dried blood sample or APOE sub-studies. ';
    @api consentExpanded12='Does it cost me anything to participate?';
    @api consentExpanded13='No.';
    @api consentExpanded14='Will you share my study data?';
    @api consentExpanded15='Sharing research data with other scientists is an important part of the research process and helps advance scientific progress. We will share de-identified data from this study with other researchers to help further research into the human brain. ';
    @api consentExpanded16='Will you share my personal information with other people?';
    @api consentExpanded17='No, we will not share your personal information without your permission. If you consent to participate in a MindCrowd collaborative study (or have previously done so), we may share or receive identifiable data such as your name or email address with our collaborative partners. Your information could also be shared with the FDA and the IRB overseeing this study. This would only be done to link your study data. ';
    @api consentExpanded18='To help protect your privacy, we have obtained a Certificate of Confidentiality from the National Institutes of Health. This means researchers may refuse to give out study information that identifies you. For example, if there were a court order requesting your study records, TGen would not give out information that identifies you, unless you have consented for this use. The Certificate does permit TGen to disclose your information when:';
    @api consentExpanded19='Required by Federal, State, or local laws. This excludes instances of Federal, State, or local civil, criminal, administrative, legislative, or other proceedings;';
    @api consentExpanded20='You have consented to the disclosure, including for your medical treatment;';
    @api consentExpanded21='Done as part of other approved research studies.';
    @api consentExpanded22='A Certificate of Confidentiality does not prevent you or someone else, like a member of your family, from voluntarily sharing information about yourself or your involvement in this research. If you want your research information released to an insurer, medical care provider, or any other person not connected with the research, you must provide consent to allow the researchers to release it.';
    @api consentExpanded23='What if I change my mind and dont want to participate in the study anymore?';
    @api consentExpanded24='Your participation is completely voluntary. You do not have to participate and you may stop at any time. Your decision will not result in any penalty to you. Please contact the Study Coordinator at crc@tgen.org to withdraw from the study.';
    @api consentExpanded25='What if I have questions or comments?';
    @api consentExpanded26='If you have any questions, concerns or complaints about this research, you may contact Dr. Matt Huentelman at mhuentelman@tgen.org or 602-343-8653 (24 hours). ';
    @api consentExpanded27='Will you contact me in the future?';
    @api consentExpanded28='We may contact you in the future via email to offer you to participate in new scientific research studies. Participation in any of our studies is completely voluntary.';
    @api consentExpanded29='What if I have questions about my rights in this research, have a complaint, or want to report a problem to someone besides the researcher?';
    @api consentExpanded30='You may contact WCG IRB at:';
    @api consentExpanded31='1019 39th Avenue SE Suite 120';
    @api consentExpanded32='Puyallup, Washington 98374-2115';
    @api consentExpanded33='Telephone:  855-818-2289';
    @api consentExpanded34='E-mail:  researchquestions@wcgirb.com';
    @api consentExpanded35='WCG IRB is a group of people who perform independent review of research.';
    @api consentExpanded36='For questions, concerns, suggestions, complaints that are not being addressed by the research team, or in case of research-related harm, please contact the TGen Office of Research Compliance at';
    @api consentExpanded37='irb@tgen.org.';
    @api DBS_text_85="I Consent";
    @api DBS_text_93="I Decline";
    @api DBS_text_88="Please Complete the Required Fields.";
    @api url_dashboard ='vipaccess';   
    @api url_password_reset ='vipaccess/passwordrecovery';   
    @api consent_text_6 = 'The MindCrowd scientific study';
    @api consent_text_7 = 'Information and Frequently Asked Questions';
    @api consent_text_8 = "Please read the following information and the answers to frequently asked questions about MindCrowd.To play the free MindCrowd memory and attention game, check the box below and press I Agree.";
    @api consentExpanded_text_11 ="I have read this form, or it has been read to me. This form describes the purpose and details of this research study. I understand that if I have questions, I should contact the study coordinator at 602-343-8653 (24 hours) or mhuentelman@tgen.org or before I consent to participate in this study.";
    @api consentExpanded_text_12 ="I consent to participate in this research study.";
    close_btn_label = close_btn;
    urlStateParameters = null;
    currentPageReference; 
    termAndCOndition = false;
    termAndCOndition2 = false;
    ErrorModalOpen = false;
    participantcode;
    email;
    consentsigned;
    isLoading=false;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
      if (currentPageReference) {
        this.urlStateParameters = currentPageReference.state;
        this.setParametersBasedOnUrl();
      }       
    }
  
    setParametersBasedOnUrl() {
      this.participantcode = this.urlStateParameters.participantcode;
      this.campaign=this.urlStateParameters.campaign;    
    }  

    checkTerm(event) {
        this.termAndCOndition = event.detail.checked;
    }

    checkTerm1(event) {
        this.termAndCOndition2 = event.detail.checked;
    }

    updateContactFields() {      
        try {
            if (!this.termAndCOndition || !this.termAndCOndition2) {
                this.ErrorModalOpen = true;
                document.querySelector("body").style.overflow = 'visible';
            } else {       
                this.isLoading=true;          
                fetchRecord({ participantcode: this.participantcode })
                .then(data => {
                    this.email = data.Email;
                    this.consentsigned = data.Consent_Signed_On__c;   
                    if (this.consentsigned) {
                        updateConsent({ participantcode: this.participantcode })
                        .then(result => {
                            window.location.href = Community_Url+"/s/"+ this.url_dashboard;
                        })
                        .catch(error => {         
                            console.error('Error updating record:', error);
                            window.location.href = Community_Url+"/s/"+ this.url_dashboard;
                        });
                    } else {
                        window.location.href = Community_Url+"/s/"+this.url_password_reset+"?Email="+this.email;                        
                    }     
                })
                .catch(error => {
                    console.error('Error:'+ error);
                    this.isLoading=false;
                });
            }
        }
        catch (e) {
        }
    }

    closeModal() {
        this.ErrorModalOpen = false;
    }

    decline(event) {
        window.location.href = url_decline;
    }
	
    disconnectedCallback() {
        this.isLoading=false;
    }	
}