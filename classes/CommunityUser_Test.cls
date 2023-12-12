/*
 * 
  Created By: {Girikon(Pramod Kumar)}
  Created On: 07/13/2021
  Description/Purpose: Test class for Community User Creation trigger on updation of Contact[ticket No-: TM-103]
  Method Name-- createCommunityUser
  Apex Class-- CommunityUserHandler(Code Coverage--86%)
  Apex Trigger-- CommunityUserCreation_Trigger(Code Coverage-100%)

 Test class for community user creation handler class 
 *
 */

@isTest
public class CommunityUser_Test
{
    @TestSetUp
    static void testUserData(){
        UserRole userrole = [Select Id, DeveloperName From UserRole Where DeveloperName = 'Manager' Limit 1];
        User adminUser = [Select Id, UserRoleId From User Where Profile.Name='System Administrator' and IsActive = true Limit 1];
        adminUser.UserRoleId = userrole.Id;
        update adminUser;                
    }
    
    //Test method
    @isTest
    private static void createCommunityUser()
    {        
        Community_Info__c cinfo = new Community_Info__c(Name='Community Settings');
        cinfo.Profile_Name__c = 'Customer Community Login User Custom';
        cinfo.Community_Label__c = 'MindCrowd';
        cinfo.Games_Reactivation_Days__c=2;
        cinfo.User_Next_Suffix__c = 'mindcrowd';
        cinfo.Profile_Id__c = [SELECT Id From Profile WHERE NAME='Customer Community Login User Custom'].Id;
        cinfo.OrgWideEmailAddress__c='mukesh.gupta@girikon.com';
        insert 	cinfo;
        
        User adminUser = [Select Id, UserRoleId From User Where Profile.Name='System Administrator' and IsActive = true and UserRole.Name = 'Manager' Limit 1];
        
        System.runAs(adminUser){
            Test.startTest();
            Account acc = new Account(Name='Test Account');
            insert acc;
            
            Contact cont2 = new Contact(firstName='test2',lastname='cont2', AccountId=acc.Id, Email = 'test@test.com');
            // Inserting new Contact
            insert cont2;
            
            Contact cont = new Contact(firstName='test',lastname='cont', AccountId=acc.Id);
            // Inserting new Contact
            insert cont;
            cont.Email = 'test12@test.com';
            cont.Parent_Contact__c= cont2.id;
            // Updating email field for contact
            update cont;
            
            
            RecursiveTriggerHandler.allowOnce();
            List<Contact> conList1 = new List<Contact>(); 
            conList1.add(new Contact(FirstName='Ram', LastName='Singh',Email='ram@test.com'));
            conList1.add(new Contact(FirstName='Raj', LastName='Kumar',Email='raj@test.com', AccountId=acc.Id));
            
            Insert conList1;
            
            List<Contact> conList2 = new List<Contact>(); 
            conList2.add(new Contact(FirstName='Lakhan', LastName='Singh', AccountId=acc.Id));
            conList2.add(new Contact(FirstName='Mahesh', LastName='Prasad', AccountId=acc.Id));
            
            Insert conList2;
            
            conList2[0].Email = 'ram@test.com';
            conList2[1].Email = 'raj@test.com';
            
            RecursiveTriggerHandler.allowOnce();
            Update conList2;			
            Test.stopTest();
        }                		        
    }
}