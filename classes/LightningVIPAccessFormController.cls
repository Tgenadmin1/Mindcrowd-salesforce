global with sharing class LightningVIPAccessFormController {
    
   
    @AuraEnabled
   global static String routeCommunityPage(String username, String password, String startUrl) {
        try{
            	
            	PageReference lgn;
            	lgn = site.login(username,password,'/userDashboardRedirect');
            	aura.redirect(lgn);
            	return null;
            
        }
        catch (Exception ex) {
            return ex.getMessage();            
        }
    }
           
           
    
    /*@AuraEnabled(cacheable=true)
    global static string changehomepageUrl() {
        String strAssumptionFloodOnlyUrl='';
        if(UserInfo.getLanguage()=='es'){
            strAssumptionFloodOnlyUrl= '/s/' + System.Label.dashboard_page_name_ES;
            //strAssumptionFloodOnlyUrl='https://mindcrowd2--devphase2.sandbox.my.site.com/MindCrowdES/s/me-tablero';
        }
        else if(UserInfo.getLanguage()=='en_US'){
            strAssumptionFloodOnlyUrl=  '/s/' + System.Label.dashboard_page_name_EN;
            //strAssumptionFloodOnlyUrl='https://mindcrowd2--devphase2.sandbox.my.site.com/MindCrowd/s/me-dashboard';
        }
        return strAssumptionFloodOnlyUrl;
    }*/
    @AuraEnabled
    global static Boolean getIsUsernamePasswordEnabled() {
        Auth.AuthConfiguration authConfig = getAuthConfig();
        return authConfig.getUsernamePasswordEnabled();
    }
    
    @AuraEnabled
    global static Boolean getIsSelfRegistrationEnabled() {
        Auth.AuthConfiguration authConfig = getAuthConfig();
        return authConfig.getSelfRegistrationEnabled();
    }
    
    @AuraEnabled
    global static String getSelfRegistrationUrl() {
        Auth.AuthConfiguration authConfig = getAuthConfig();
        if (authConfig.getSelfRegistrationEnabled()) {
            return authConfig.getSelfRegistrationUrl();
        }
        return null;
    }
    
    @AuraEnabled
    global static String getForgotPasswordUrl() {
        Auth.AuthConfiguration authConfig = getAuthConfig();
        return authConfig.getForgotPasswordUrl();
    }
    
    @AuraEnabled
    public static String forgotPassword(String username, String checkEmailUrl) {
        try {
            Site.forgotPassword(username);
            ApexPages.PageReference checkEmailRef = new PageReference(checkEmailUrl);
            if(!Site.isValidUsername(username)) {
                return Label.Site.invalid_email;
            }
            aura.redirect(checkEmailRef);
            return null;
        }
        catch (Exception ex) {
            return ex.getMessage();
        }
    }
    
    @TestVisible
    global static Auth.AuthConfiguration getAuthConfig(){
        Id networkId = Network.getNetworkId();
        Auth.AuthConfiguration authConfig = new Auth.AuthConfiguration(networkId,'');
        return authConfig;
    }
    
    @AuraEnabled
    global static String setExperienceId(String expId) {    
        // Return null if there is no error, else it will return the error message 
        try {
            if (expId != null) {
                Site.setExperienceId(expId);               
            }
            return null; 
        } catch (Exception ex) {
            return ex.getMessage();            
        }        
    } 
}