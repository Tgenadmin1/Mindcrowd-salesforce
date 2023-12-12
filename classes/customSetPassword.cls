public without sharing class customSetPassword { 
    // public PageReference ClosePopup() {
    //    DisplayPopUp =false ;
    //     ClosePopup = true;
    //     return null;
    // }
    
    
    public boolean DisplayPopup {get; set;}   
    public string toPassData { get; set;}
    public boolean deleteCookies { get; set;}
    public boolean goHomePopup {get; set;}   
    public string language {get;set;}
    public boolean ExpConsentSigned {get;set;}
    
    public PageReference ClosePopup() {       
        DisplayPopup = false; 
        return null ;
    }
    public PageReference ClosePopup2() {
        
        PageReference newocp = new PageReference(Label.Community_Url+'/s/');return newocp;
    }
    
    
    
    // public void ShowPopup() {       
    //     DisplayPopup = true;   
    // } 
    public boolean ClosePopup { get; set; }
    public String inputText1{get;set;} // input text1 value from visualforce page
    public String inputText2{get;set;} // input text2 value from visualforce page
    public String text1;
    public String text2;
    public String errormessage{get;set;}
    public Boolean checkbox1{get;set;}
    public Boolean checkbox2{get;set;}
    public Id contactIdPassedCtrl{get; set;}
    public String username {get;set;}
    public String domainURL {get;set;}
    
    public Id userId {get;set;}
    public Boolean sendUserEmail {get;set;}
    
    
    
    public void MyActionMethod(){
        //bool = false;
        domainURL=URL.getSalesforceBaseUrl().getHost();
        String url = site.getPathPrefix();
        system.debug('domainURL===>'+domainURL);
        if(url.contains('MindCrowd') || test.isRunningTest()){
            language = 'en_US';
        }
        
        if(url.contains('MindCrowdES') || test.isRunningTest()){
            language = 'es';
        }
        domainURL=  'sid=1;' +  'domain=.' + domainURL + ';path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        system.debug('lllll' + domainURL);
        deleteCookies = false;
        goHomePopup = false;
        
        //Added by Sibi for TSS-6 
        	ExpConsentSigned=false;       
            String logginUserName = UserInfo.getUserName(); 
            Id contId;
            User loginUser = [SELECT Id, Name,username,firstname,lastname,ContactId  FROM User WHERE UserName  =: logginUserName limit 1];
            if(loginUser != null){                
              contId = loginUser.ContactId;
            }
                  if(contId != null){                    
                    Contact contLst;
                    if(!test.isRunningTest()){ contLst = [SELECT Id,Consent_Signed_On__c FROM Contact Where Id =:contId limit 1];}
                    if( contLst != null){ 
                        if(contLst.Consent_Signed_On__c==null){                              
                        }  
                        else{
                            ExpConsentSigned = true;
                        }
                    } 
                } 
        //End - added by Sibi for TSS-6
        
    }
    
    
    //--------------------------------------------------    
    public PageReference  saveTextValue(){
        PageReference newocp;
        DisplayPopUp = false;
        text1 =  inputText1;  
        text2 =  inputText2;  
        system.debug('text1==>'+text1);
        system.debug('text2==>'+text2);
        // username = user.ge
        system.debug('usernameusername' + username);
        system.debug('checkbox not checked1!'+checkbox1);
        //DisplayPopUp = true;
        
        
        
        if((text1== '' || text1==  null) && ( text2 == ''|| text2 == null)){
            DisplayPopUp = true;
            if(language.contains('en_US')){
                errormessage= System.Label.Password_Asterisk_Error;
            }
            if(language.contains('es')){
                errormessage= System.Label.Password_Asterisk_Error_Spanish;
            }
            
            // ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Please fill out the fields marked with an asterisk.'));
            system.debug('checkbox not checked1!'+checkbox1);
            return null;
        }
        if(!text1.equals(text2)){
            system.debug('did not match!');
            DisplayPopUp = true;
            //errormessage='Password and the Confirm Password entries do not match, Please enter the same password for both of these.';
            
            if(language.contains('en_US')){
                errormessage= System.Label.Password_Error_Message;
            }
            if(language.contains('es')){
                errormessage= System.Label.Password_Error_Message_Spanish;
            }
            //ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Both Password did not match'));
            system.debug('checkbox not checked1!'+checkbox1);
            return null;
            
        }
        system.debug('checkbox not checked1!'+checkbox1);
        if(!ExpConsentSigned){//Added this check for TSS-6
            if(checkbox1 == false){
                system.debug('checkbox not checked1!');
                DisplayPopUp = true;
                if(language.contains('en_US')){
                    errormessage= System.Label.Password_Checkbox_Error;
                }
                if(language.contains('es')){
                    errormessage= System.Label.Password_Checkbox_Error_Spanish;
                }
                //ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,'Please click on the checkbox at the bottom of the page before pressing the '+ 'SAVE'+ ' button.');
                //ApexPages.addMessage(myMsg);
                return null;
            }
            if(checkbox2 == false){
                DisplayPopUp = true;
                system.debug('checkbox not checked2!');
                if(language.contains('en_US')){
                    errormessage= System.Label.Password_Checkbox_Error;
                }
                if(language.contains('es')){
                    errormessage= System.Label.Password_Checkbox_Error_Spanish;
                }
                
                // ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,'Please click on the checkbox at the bottom of the page before pressing the '+ 'SAVE'+ ' button.');
                //ApexPages.addMessage(myMsg);
                return null;
            }
        }
        
        
        //------------------------------------------------------------------
        Boolean result = false;
        String emailRegex = '^(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
        Pattern EmailPattern = Pattern.compile(emailRegex);
        Matcher EmailMatcher = EmailPattern.matcher(inputText1);
        Matcher EmailMatcher2 = EmailPattern.matcher(inputText2);
        if(EmailMatcher.matches() && EmailMatcher2.matches() && text1 == text2 )
        {			
            if((checkbox1==true && checkbox2==true && !ExpConsentSigned) || ExpConsentSigned)
            	{
                    result = true;
                    system.debug('result===>'+username);
                    system.debug('match!');
                    //List<User> users = new List<User>();
                    //  username = UserInfo.getUserName();
                    
                    username = UserInfo.getUserName(); 
                    
                    //}// need to add in the parameter just for testing
                    user users = [SELECT Id, Name,username,firstname,lastname,ContactId  FROM User WHERE UserName  =: username limit 1];
                    system.debug('users-->'+users.ContactId);
                    system.debug('username-->'+username);
                    Set<Id> conIds = new Set<Id>();
                    if(users != null){
                        
                        conIds.add(users.ContactId);
                        try{
                            System.setPassword(users.id, text2);
                        }catch(Exception e){
                            DisplayPopUp = true;
                           
                            if(language.contains('en_US')){
                                errormessage= System.Label.Repeated_Password_Error;
                            }
                            if(language.contains('es')){
                                errormessage= System.Label.Repeated_Password_Error_Spanish;
                            }
                            system.debug('invalid password'+e.getMessage());
                            return null;
                        }
                        
                        //}
                        if(conIds != null){
                            system.debug('conIds-->'+conIds);
                            Contact conLst;
                            if(!test.isRunningTest()){ conLst = [SELECT Id,Consent_Signed_On__c FROM Contact Where Id =:conIds limit 1];}
                            if( conLst != null){ 
                                if(conLst.Consent_Signed_On__c==null){
                                    conLst.Consent_Signed_On__c = System.now();
                                    update conLst; 
                                }
                                deleteCookies = true; 
                              
                              
                            } 
                        } 
                        PageReference newocp1 = new PageReference(Label.Community_Url+'/s/'+ Label.url_dashboard);
                        newocp1.setRedirect(true);
                        return newocp1;
                    }
                    ApexPages.addmessage(new ApexPages.message(ApexPages.severity.CONFIRM,'Success!'));
                }
        }
        
        if(!EmailMatcher.matches() )
        {
            DisplayPopUp = true;
            //errormessage='Your password must be at least eight characters long and one number';
            
            if(language.contains('en_US')){
                errormessage= System.Label.Password_Length_Error;
            }
            if(language.contains('es')){
                errormessage= System.Label.Password_Length_Error_Spanish;
            }
            //ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.INFO,'Your password code must have a mix of letters and numbers');ApexPages.addMessage(myMsg); return null;
            return null;
            
        }
        
        newocp = new PageReference(Label.Community_Url+'/s/'+ Label.url_dashboard); 
        newocp.setRedirect(true);
        return newocp;
        //------------------------------------------------------
    }   
    
}