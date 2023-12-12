public without sharing class UnsubscribeCtrl {
    
    private static String kHexChars = '0123456789abcdef';

    public static String newGuid() {

        String returnValue = '';
        Integer nextByte = 0;

        for (Integer i=0; i<16; i++) {

            if (i==4 || i==6 || i==8 || i==10) 
                returnValue += '-';

            nextByte = (Math.round(Math.random() * 255)-128) & 255;

            if (i==6) {
                nextByte = nextByte & 15;
                nextByte = nextByte | (4 << 4);
            }

            if (i==8) {
                nextByte = nextByte & 63;
                nextByte = nextByte | 128;
            }

            returnValue += getCharAtIndex(kHexChars, nextByte >> 4);
            returnValue += getCharAtIndex(kHexChars, nextByte & 15);
        }

        return returnValue;
    }

    public static String getCharAtIndex(String str, Integer index) {

        if (str == null) return null;

        if (str.length() <= 0) return str;    

        if (index == str.length()) return null;    

        return str.substring(index, index+1);
    }

    @AuraEnabled
    public static void backOff(String guid){        
        try {
            String key;
            String conId='';
            if(String.isNotBlank(guid) && guid.length()>36){
                key = guid.substring(0, 36);
                conId = guid.substring(36, guid.length());
            }            

            List<Contact> contactList = [SELECT Unsubscribe__c,HasOptedOutOfEmail,HasOptedOutOfFax,
                Allow_Newsletters__c,Unsubscribe_Date__c FROM Contact WHERE 
                Secure_GUID__c=:String.escapeSingleQuotes(key) AND Id=:conId
                 AND Secure_GUID__c!=null AND Secure_GUID__c!='' LIMIT 1];
            if(!contactList.isEmpty() && !contactList[0].Unsubscribe__c){
                contactList[0].Unsubscribe__c=true;
                contactList[0].HasOptedOutOfEmail = true;
                contactList[0].HasOptedOutOfFax = true;  
                contactList[0].Unsubscribe_Date__c = System.now();
                contactList[0].Allow_Newsletters__c = false;
                update contactList;
            }
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}