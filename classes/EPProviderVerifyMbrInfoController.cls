public with sharing class EPProviderVerifyMbrInfoController {
    public EPProviderVerifyMbrInfoController() {}//Sibi - No need of blank constructor. By default there is always a blank constructor for a class

    //Sibi - Multiple queries are getinstance method to same custom data type to be avoided instead do just one query to get all the required records

    public static final string PROVIDER_LOCATION_ERROR = Zipcodes__mdt.getInstance('Zipcode1').Zipcode__c;
    public static String CaseCreatedMessage= [Select Id, MasterLabel, Zipcode__c FROM Zipcodes__mdt Where MasterLabel = 'Zipcode1'].Zipcode__c;
	
    Public Static final string CLASS_NAME = 'EPProviderVerifyMbrInfoController';
    Public Static final string GET_CASE_CREATION_MESSAGE  = 'getCaseCreationMessage';
    public static final string LWC_METHOD_NAME='getLWCMessages';
    
    /*Method used to get Lwc Messages and return to LWC
    * @return lwcdata
    */
	//Sibi -  Return a proper error message instead of null
    @AuraEnabled(cacheable=true)
    public static list<lwcMessages> getLWCMessages() {
        try{
            list<lwcMessages> lwc = new list<lwcMessages>();
            lwcMessages lwcdata = new lwcMessages();
            lwcdata.Provider_Location_Error = PROVIDER_LOCATION_ERROR;
            lwc.add(lwcdata);
            return lwc;
        } catch (Exception ex) {
            //ExceptionLogsHandler.logExceptions(CLASS_NAME, LWC_METHOD_NAME, String.valueOf(ex.getCause()), ex.getMessage(), ex.getTypeName(), ex.getLineNumber(), ex.getStackTraceString());
            return null;
        }
    }

    /*Method used to get the Apex Class NameSpace and returns it to LWC
* @return String - nameSpace
*/
	//Sibi - Add exception handling


    /*Method used to get the getCaseCreationMessage and returns it to LWC
    * @return String - caseMessage
    */
	//Sibi -  Return a proper error message instead of null
    @AuraEnabled(cacheable=true)
    public static UIMessagesWrapperClass getCaseCreationMessage() {
        try {
            UIMessagesWrapperClass UIWC = new UIMessagesWrapperClass();
            UIWC.CaseCreated = CaseCreatedMessage;           
            return UIWC;
        } catch (Exception ex) {
            //ExceptionLogsHandler.logExceptions(CLASS_NAME, GET_CASE_CREATION_MESSAGE, String.valueOf(ex.getCause()), ex.getMessage(), ex.getTypeName(), ex.getLineNumber(), ex.getStackTraceString());
            return null;
        }
    }

    public class UIMessagesWrapperClass{
        @AuraEnabled public String CaseCreated{get;set;}
    }

    public class lwcMessages{
        @AuraEnabled public string Provider_Location_Error;

    }
}