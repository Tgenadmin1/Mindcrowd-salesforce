public without sharing class ViewIPAddressController {
    public string myip {get;set;}
    public pageReference getUserIPAddress() {
        String ip;
        // True-Client-IP has the value when the request is coming via the caching integration.
        ip = ApexPages.currentPage().getHeaders().get('True-Client-IP');

        myip=ip;
        
        // X-Salesforce-SIP has the value when no caching integration or via secure URL.
        if (ip == '' || ip == null) {
            ip = ApexPages.currentPage().getHeaders().get('X-Salesforce-SIP');
            myip=ip;
        } 
        
        // get IP address when no caching (sandbox, dev, secure urls)        
        if (ip == '' || ip == null) {
            ip = ApexPages.currentPage().getHeaders().get('X-Forwarded-For');
            myip=ip;
        }
        System.debug('ip address external:'+ip);
        //get IP address from standard header if proxy in use
        //ip = ApexPages.currentPage().getHeaders().get('True-Client-IP');  
        return null;
        
    }
}