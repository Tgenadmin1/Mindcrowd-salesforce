({
    myAction : function(component, event, helper) {
       // let attScore = "270 MS";
       // let memScore = "34/36";

        let bgimages = [];
        function preloadImage(imgdata) {      
            for (var i = 0; i < imgdata.length; i++) {
                bgimages[i] = new Image();
                bgimages[i].src = $A.get("$Label.c.Community_Url") +'/resource/resultsScoreIimages/'+imgdata[i];
            }
        }

       // console.log('image load' , preloadImage.load);
       preloadImage([
           "results-score-attention-test-2.png",
           "results-score-attention-test-3.png",
           "results-score-attention-test-4.png",
           "results-score-attention-test-1.png",
           "results-score-memory-test-2.png",
           "results-score-memory-test-3.png",
           "results-score-memory-test-4.png",
           "results-score-memory-test-1.png" 
       ])
       
        const contact= localStorage.getItem('c__id');
        var contactId = null;

        if (contact != null && contact != undefined) {
           // contactId = JSON.parse(atob(contact));
            contactId = atob(contact);
         } 
        else {
            console.log('contactid does not found.');
        }
        component.set('v.contactId', contactId);

     //=========================================================================================
     helper.saveSignatureAttension(component, event, helper);
     helper.saveSignatureMemory(component, event, helper);
           
        
    }
})