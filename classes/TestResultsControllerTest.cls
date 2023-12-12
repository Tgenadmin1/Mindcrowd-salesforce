@isTest
public class TestResultsControllerTest {
@isTest
    private static void getChartMapTest(){
        Test_Result__c objDashboard= new Test_Result__c();
        objDashboard.Data_Value__c = 20;
        objDashboard.Order__c =2;
        objDashboard.Data_Category__c = 'Ready to send';
        objDashboard.Data_Name__c = 'Test';
        insert objDashboard;
         Test_Result__c objDashboard1= new Test_Result__c();
        objDashboard1.Data_Value__c = 20;
        objDashboard1.Order__c =2;
        objDashboard1.Data_Category__c = 'subscription';
        objDashboard1.Data_Name__c = 'Test';
        insert objDashboard1;
        
        
        
        
        TestResultsController.getResultsDashboardData();
    }
}