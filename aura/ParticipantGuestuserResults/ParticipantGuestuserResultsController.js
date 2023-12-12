({
    doInit: function(component, event, helper) {
        component.set('v.resultUrl', window.location);

       // const urlParams = new URLSearchParams(document.location.search.substring(1));
        //console.log('sss')
        //const contact = urlParams.get('id');
        
        if(!window.location.toString().includes("live-preview")){
        if(localStorage.getItem('consent') != "true"){
            // window.location = Community_Url + "/s/" + consent_URL;
            window.location = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_testlanguage");
        }else if((localStorage.getItem('c__id') == '' || localStorage.getItem('c__id') ==undefined) && localStorage.getItem('consent') == "true"){

            // window.location = Community_Url + "/s/" + url_aboutyourbrain;
            window.location = $A.get("$Label.c.Community_Url") + "/s/" + $A.get("$Label.c.url_aboutyourbrain");
        }else{
            var lastBrain = localStorage.getItem('LastPage').substring(localStorage.getItem('LastPage').lastIndexOf("/") + 1, localStorage.getItem('LastPage').length);
            var pageName1 = $A.get("$Label.c.url_results" ).substring($A.get("$Label.c.url_results" ).lastIndexOf("/") + 1, $A.get("$Label.c.url_results" ).length);
            if((lastBrain!=$A.get("$Label.c.url_emailrequestvipinvite")  && lastBrain!=pageName1) ) {    
                 window.location = localStorage.getItem('LastPage');
            }else{
                
                localStorage.setItem('LastPage',  document.URL);
                
            }
        }  
        
    }
    








        
        const contact= localStorage.getItem('c__id');
        console.log('contact', contact);
        var contactId = null;
        
        if (contact != null && contact != undefined) {
            
          //  contactId = JSON.parse(atob(contact));
            contactId = atob(contact);
           // alert('ttt' + contact + '====' + contactId);
            console.log('my contactId', contactId);
        } else {
            console.log('contactid does not found.');
        }
        console.log('contactId is ?', contactId);
        component.set('v.contactId', contactId);
        
        component.set('v.showCharts', true);

      
    },
    openEmail : function(component, event, helper) {
        var url = encodeURIComponent( window.location);
        
        //var url =  window.location;
        url = 'mailto:?subject=Your Results of MindCrowd Games&body=' + url;
        window.location.href = url;
        
        
    },
    copyClassic : function(component, event, helper){
        
        var urlClassic = document.getElementById('urlClassic');
        urlClassic.select();
        document.queryCommandSupported('copy');
        document.execCommand('copy');
        //urlClassic.remove();
        
        var source = event.getSource();
        source.set('v.label', 'COPIED!');
        setTimeout(function(){
            source.set('v.label', 'Copy URL');
        }, 2000);
    }
    
    
})