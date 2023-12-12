/*Created By: {Girikon(Pramod)} [Jira# TM-1395]
Created On: 29/07/2022
Description/Purpose: To capture exception log and make an entry in Databse.
Methods: logException
Test Class: ExceptionLogHandler_Test

Modification log --
Modified By: {####(####)} [Jira #]
Modified On: MM/DD/YYYY*/
public  class ExceptionLogHandler
{     
    //Save exception log 
    public static void logException(Exception ex,String className, String methodName, String description)
    {
        //Use following code to get various info from execption object
        if(ex!=null)
        {
            description = ex.getMessage() ;
            String stackTrace = ex.getStackTraceString().substringBefore('\n');
            className = stackTrace.substringAfter('.').substringBefore('.'); 
            methodName = stackTrace.substringBefore(':').substringAfter(className).substringAfter('.');    
        }                
        
        Community_Info__c mc = Community_Info__c.getValues('Community Settings');
        //Check whether we have to log exception or not
        if(mc!=null && mc.Log_Exception__c)
        {
            //Create instance of "Exception Log" object
            Exception_Log__c log = new Exception_Log__c();
            log.Class__c = className;
            log.Method__c = methodName;
            log.Description__c = description;
            //Create log in db
            Insert log;            
        }

    }
}