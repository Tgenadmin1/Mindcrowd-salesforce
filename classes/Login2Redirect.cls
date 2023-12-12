Public Class Login2Redirect
{
    Public PageReference redirect()
    {   
        String OriginalUrl=Site.getOriginalUrl(); 
        if(Test.isRunningTest())
            OriginalUrl='https://mindcrowd.org/s/';
        System.Debug('StartURL: '+apexpages.currentpage().getparameters().get('startURL'));
        if(String.IsNotBlank(apexpages.currentpage().getparameters().get('startURL')))
        {
            OriginalUrl=apexpages.currentpage().getparameters().get('startURL');
        System.Debug('OriginalUrl1: '+OriginalUrl);
        }
        else if(String.IsNotBlank(OriginalUrl))
        {            
            OriginalUrl=OriginalUrl.Trim();
            if(OriginalUrl.containsIgnoreCase('/s')) 
            {   
                OriginalUrl=OriginalUrl.replaceFirst('/s', '');
            }
            OriginalUrl='/s/'+OriginalUrl;
                    System.Debug('OriginalUrl2: '+OriginalUrl);
        }
        else
            OriginalUrl='';
        if(String.IsNotBlank(OriginalUrl) && OriginalUrl.containsIgnoreCase('https'))
        {
            if(OriginalUrl.containsIgnoreCase('//'))
                OriginalUrl=OriginalUrl.replaceFirst('//', '');
            OriginalUrl=OriginalUrl.substring(OriginalUrl.indexOf('/'));
        }
            
        String url=Label.Community_Url +OriginalUrl;
        PageReference redirectToUrl = new PageReference(url);
        redirectToUrl.setRedirectCode(301);
        redirectToUrl.setRedirect(true);
        return redirectToUrl;
    }
}