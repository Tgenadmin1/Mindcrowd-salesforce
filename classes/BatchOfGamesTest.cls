// Created By: {Girikon(Shweta Khunteta)}
// Created On: 08/09/2021(DD/MM/YYYY)
// Description/Purpose: test class for testing BatchOfGames
// Methods: {start,execute,finish}
// Apex Class: {BatchOfGames}

@isTest
public with sharing class BatchOfGamesTest 
{
  @testSetup static void setup() 
  {
    List<Contact> testContact = new List<Contact>();
    for(integer i = 0; i < 10; i++) 
    {
     Contact c = new Contact(LastName = 'NotFirstName'+i,
     Verbal_Paired_Associates__c='Completed',
     Deary_Simple_And_Complex_Reaction_Time__c='Completed');
     testContact.add(c);
    }
    insert testContact;

    Game_Detail__c game =new Game_Detail__c(Name='Verbal Paired Associates');
    insert game;
    List<Participant_Game_Info__c> pgList = new List<Participant_Game_Info__c>();
    pgList.add(new Participant_Game_Info__c(Contact_Name__c = testContact[0].Id,Game_Name__c=game.Id));
    pgList.add(new Participant_Game_Info__c(Contact_Name__c = testContact[0].Id,Game_Name__c=game.Id));
    insert pgList;
 
  }
@isTest
public static void testBatchofGames()
{
    Test.startTest();
    List<AggregateResult> query=[SELECT MAX(CreatedDate) createddate,Game_Name__c gm,Contact_Name__c cnid 
    from Participant_Game_Info__c 
    where (createddate< LAST_N_DAYS:2) AND  Game_Name__r.Name IN ('Deary Simple And Complex Reaction Time','Verbal Paired Associates')
    AND (Contact_Name__r.Verbal_Paired_Associates__c ='Completed' OR Contact_Name__r.Deary_Simple_And_Complex_Reaction_Time__c='Completed') 
    GROUP BY Game_Name__c, Contact_Name__c     
     ]; 
     Database.QueryLocator ql;
     Database.BatchableContext bat;   

     BatchOfGames obj = new BatchOfGames(query);
     List<Contact> cList= [select Id,Email from Contact];       
    ql = obj.start(bat);
    obj.execute(bat, cList);
    obj.finish(bat);
    database.executeBatch(obj);   
    Test.stopTest();

}
}