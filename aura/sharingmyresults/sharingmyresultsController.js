({
    doInit: function(component, event, helper) {
        component.set('v.resultUrl', window.location);
        const urlParams = new URLSearchParams(document.location.search.substring(1));
        const contact = urlParams.get('id');
        var contactId = null;
        if (contact != null && contact != undefined) {
            contactId = atob(contact).replace(/(^")|("$)/g, '');
        }
        component.set('v.contactId', contactId); 
        component.set('v.showCharts', true);

        
          console.log('contactId=', contact);
          if (contact != null && contact != undefined  && contact != '') {
             document.title = $A.get("$Label.c.shrd_title");
          }
          var meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        //meta.setAttribute("id", contact);
        meta.setAttribute("content", $A.get("$Label.c.shrd_title") +' '+ contact);
        document.getElementsByTagName('head')[0].appendChild(meta);
    },
    openEmail : function(component, event, helper) {
        var url = encodeURIComponent( window.location);
        url = 'mailto:?subject=Your Results of MindCrowd Games&body=' + url;
        window.location.href = url;       
    },
    copyClassic : function(component, event, helper){
        
        var urlClassic = document.getElementById('urlClassic');
        urlClassic.select();
        document.queryCommandSupported('copy');
        document.execCommand('copy');      
        var source = event.getSource();
        source.set('v.label', 'COPIED!');
        setTimeout(function(){
            source.set('v.label', 'Copy URL');
        }, 2000);
    },
    
})