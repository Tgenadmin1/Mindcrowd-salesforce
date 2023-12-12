@isTest
public class AdminDashBoardcontrollerTest 
{
    @isTest
    private static void getGroupChartMapTest()
    {
        Contact c = new Contact();
        c.LastName= 'test last name';
        c.Email = 'Test@test.com';
        Insert c;
        
        Research_Campaign__c res= new Research_Campaign__c();
        res.Name='Covid';
        res.Weight_in_Ounces__c=3;
        res.Usps_Service_Type__c='FIRST CLASS';
        insert res;
        
        Shipping_Detail__c sdc =new Shipping_Detail__c();
        sdc.Shipment_Status__c='Sent';
        sdc.Campaign__c=res.Id;
        sdc.Contact_Id__c=c.Id;
        insert sdc;
        
        Shipping_Detail__c sdc1=new Shipping_Detail__c();
        sdc1.Shipment_Status__c='Created';
        sdc1.Campaign__c=res.Id;
        sdc1.Contact_Id__c=c.Id;
        insert sdc1;
        AdminDashBoardcontroller.getResearchCampaigns();
        AdminDashBoardcontroller.getGroupChartMap(Date.Today().addDays(-30), Date.Today().addDays(2), res.Id);
        AdminDashBoardcontroller.getGroupChartMap(Date.Today().addDays(-30), Date.Today().addDays(2), res.Id);  
        
    }
    
    @isTest
    private static void getOtherGroupChartMap()
    {
        Game_Detail__c gd = new Game_Detail__c();
        gd.Name ='DLTRS';       
        insert gd;
        
        Contact co = new Contact();
        co.Email = 'test@test.com';
        co.LastName = 'test1';
        insert co;
        Participant_Game_Info__c pg = new Participant_Game_Info__c();
        pg.Contact_Name__c = co.Id;
        pg.Game_Name__c = gd.Id;
        pg.Game_Play_Status__c = 'Completed';
        insert pg;
        //AdminDashBoardcontroller.getOtherGroupChartMap(Date.Today().addDays(-30), Date.Today().addDays(1));
        Participant_Game_Info__c pg1 = new Participant_Game_Info__c();
        pg1.Game_Play_Status__c = 'Not-Completed';
        pg1.Contact_Name__c = co.Id;
        pg1.Game_Name__c = gd.Id;
        insert pg1;     
     AdminDashBoardcontroller.getOtherGroupChartMap(Date.Today().addDays(-30), Date.Today().addDays(2));
    }
}