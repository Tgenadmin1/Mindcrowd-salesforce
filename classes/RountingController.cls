public without sharing class RountingController {
    public String url{get; set;} 
    
    Public String RountingPath(){
        system.debug('in routing'+UserInfo.getLocale());
        String siteUrl = System.Label.Community_Url;
        String mindCrowd = Label.MindCrowd_English;
        String mindCrowdES = Label.MindCrowd_Spanish;
        //siteUrl =  siteUrl.substring(0, siteUrl.lastIndexOf('/'));
        
        if(UserInfo.getLocale() == 'en_US'){
            url = siteUrl+'/s/me-dashboard';
	     }
        if(UserInfo.getLocale() == 'es_ES' || UserInfo.getLocale() == 'es'){
            url = siteUrl+'/s/pme-panel-control';
	     }
        
        return url;
    }
    

}