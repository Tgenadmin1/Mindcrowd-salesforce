/*Created By: {Girikon(Pramod)} [Jira# TM-1395]
Created On: 29/07/2022
Description/Purpose: Test Class for ExceptionLogHandler
Coverage: 100%

Modification log --
Modified By: {####(####)} [Jira #]
Modified On: MM/DD/YYYY*/
@isTest
public class ExceptionLogHandler_Test
{ 
    @isTest
    public static void test1()
    {
        try
        {
            Community_Info__c setting = new Community_Info__c();
            setting.Name = 'Community Settings';
            setting.Log_Exception__c= true;
            insert setting; 
            
            integer i = 1/0;    
        }
        catch(exception ex)
        {
            ExceptionLogHandler.LogException(ex,'','','');
        }
    }
}