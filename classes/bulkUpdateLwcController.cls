/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 15/06/2022
  Description/Purpose:this class is to update APOE_Genotype__c of shipping details object based on barcode values ticket TM-942
  Test Class--bulkUpdateLwcController_Test
 *
 */
public class bulkUpdateLwcController {
    
    @AuraEnabled
    public static string saveFile(String base64Data) {
        System.debug('base64Data-->'+base64Data);
		string screenMessage; // to show the message on the screen 
        list<string> barcodelist =  new list <string>();
         list<string> unsucessullist2 =  new list <string>();
        Map<string,string> unsucessullist = new Map<string,string>();
        list<string> abplst = new list<string>();
        integer searchErrMsg;
        Boolean recordsAreUpdated = FALSE;
        String data    = JSON.deserializeUntyped(base64Data).toString(); // to deserialize the list of record from csv 
        System.System.debug('data---<>>>'+data);
        Map<string,Shipping_Detail__c> shipDtlMap = new Map<string,Shipping_Detail__c>();
        Map<string, string> ProductCodeToProductName = new Map<string, string>();
        Map<string, string> sss = new Map<string, string>();
        list<String> lstCSVLines = data.split('\n'); // to split the reocrd from csv file that is uploaded 
        System.debug('lstCSVLines==>'+lstCSVLines);
        
        List<String> strLst = new List<String>();
        for(String str : lstCSVLines){
            strLst.add(str);
        }
        
        Boolean bar = false;
        String str11;
        String str22;
        Integer count=0;
        string error1;
        string error2;
        string row1='';
        string row2='';
        
        
        
        for(String ss : strLst[0].split(',')){
            if(bar == false){
                str11 = ss;
                bar = true;
            }
            else{
                str22 = ss.deleteWhitespace();
                
            }
        }
        
        string strrrr = strLst[0];
        List<String> lstString = strrrr.split(',');
       
        try{
            if(lstString.size() == 2 && str11 == 'Barcode__c' && str22 == 'APOE_Genotype__c' ){

                for(Integer i = 1; i < lstCSVLines.size(); i++){
                    
                    String csvLine = lstCSVLines[i];
                   
                    List<String> lstStringww = csvLine.deleteWhitespace().split(',');
                    for(string kkk : lstStringww){
                        // to get the list of record thta don't have values for APOE_Genotype__c in the csv file that is uploaded 
                        if(lstStringww.size() == 1){
                            error1='APOE Genotype is null.';
                             row1 = row1 + '<tr><td style="borader:1px #999999 solid; padding:5px;">'+lstStringww[0]+'</td><td style="borader:1px #999999 solid;padding:5px;"> </td><td style="borader:1px #999999 solid; padding:5px;">'+error1+'</td></tr>';
                            
                            unsucessullist.put(lstStringww[0],error1);
                           // unsucessullist2.add(row1);
                        }
                         // to create the map of the the barcode and APOE_Genotype__c
                        if(lstStringww.size()>1) {
                            system.debug(':::::::::::::::::::' + lstStringww[0]);
                            ProductCodeToProductName.put(lstStringww[0].replace('"',''), lstStringww[1].replace('/',''));
                            System.debug('ProductCodeToProductName-->'+ ProductCodeToProductName.keyset());
                        }
                    }
                }
 
                for(Shipping_Detail__c shipDtl : [Select id, Barcode__c, APOE_Genotype__c From Shipping_Detail__c where Barcode__c IN: ProductCodeToProductName.keyset() ]){
                 
                    if(!shipDtlMap.containskey(shipDtl.Barcode__c) && ProductCodeToProductName.containskey(shipDtl.Barcode__c)){
                        system.debug('qqqqqqqqqqqqqq' + shipDtl.Barcode__c);                             
                        shipDtl.APOE_Genotype__c = ProductCodeToProductName.get(shipDtl.Barcode__c);
                        count = count+1;
                        shipDtlMap.put(shipDtl.Barcode__c,shipDtl);  
                    }
                    
                    
                } 
               
                for(string csvValue :ProductCodeToProductName.keyset() ){
                    
                    system.debug('csvValuecsvValue' + csvValue + 'rohit');
                    //system.debug('dataBaseValuedataBaseValue' + dataBaseValue + 'dua');
                    if( !shipDtlMap.containskey(csvValue) ){
                        error2='This is invalid Barcode!';
                         row2 = row2 + '<tr><td style="borader:1px #999999 solid; padding:5px;">'+csvValue+'</td><td style="borader:1px #999999 solid; padding:5px;">'+ProductCodeToProductName.get(csvValue)+'</td><td style="borader:1px #999999 solid; padding:5px;">'+error2+'</td></tr>';
                        unsucessullist.put(csvValue,error2);
                        //unsucessullist2.add(row2);
                    }
                }
                //}
                //to get the list of barcode that are not in the database but present in the csv file 
                if(!unsucessullist.isEmpty()){
                    String UserEmail = UserInfo.getUserEmail();
                    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                    List<String> sendTo = new List<String>();
                    //sendTo.add(UserInfo.getUserEmail());  
                    sendTo.add( UserEmail);
                    System.debug('sendTo-->'+sendTo);
                    mail.setToAddresses(sendTo);       
                    mail.setSubject('List of barcode');   
                    
     
                    String body = 'Hi,<br/><br/>' 
                        
                        +'This is the list of barcodes that failed to update the APOE genotype information during the batch upload: <br/><br/>'+  
                        '<table border="1" bordercolor="#666666"  cellspacing="0" cellpadding="0">'+
                        '<tr><td style="borader:1px #999999 solid; padding:5px; background-color:#cccccc; font-weight:bold;">Barcode__c</td><td style="borader:1px #999999 solid; padding:5px; background-color:#cccccc; font-weight:bold;">APOE_Genotype__c</td><td style="borader:1px #999999 solid; padding:5px; background-color:#cccccc; font-weight:bold;">Error</td></tr>'+
                        
                        row1 + row2
                       
                        
                        
                        +'<table>';
                      
                    
                    System.debug('body--> '+body);
                    mail.setHtmlBody(body);
                   
                        Messaging.sendEmail(new list<Messaging.SingleEmailMessage> {mail} );
                    
					screenMessage = '  <br/>Number of Records that Failed to Update:    ' + unsucessullist.size() + '  <br/> Email was sent to: ' + UserEmail + ( screenMessage != null ?screenMessage:'.') +' with a list of failed records and their error codes';
                }
                if(!shipDtlMap.isEmpty()){
                    recordsAreUpdated = true;
					screenMessage = 'Number of Records that were Updated: ' + count  +( screenMessage != null ?screenMessage:'.')  ;
                    update shipDtlMap.values();
                }
                
            } else{
                count = 0;
                recordsAreUpdated = false;
                screenMessage = 'Please check the file ';
            }
        }
        
        catch(Exception ex){
            searchErrMsg = ex.getLineNumber() ;
        }
        
        System.debug('recordsAreUpdated==>'+ recordsAreUpdated);
        return  screenMessage;
    }
}