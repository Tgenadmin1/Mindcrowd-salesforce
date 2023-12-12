// Created By: {Girikon(Shweta Khunteta)}
// Created On: 08/09/2021(DD/MM/YYYY)
// Description/Purpose: test class for testing ScheduleBatchOfGames
// Methods: {execute}
// Apex Class: {ScheduleBatchOfGames}

@isTest
public with sharing class ScheduleBatchOfGamesTest 
{
    @testSetup static void setup() 
    {
    
      List<Contact> testContact = new List<Contact>();
      for(integer i = 0; i < 10; i++) 
      {
         Contact c = new Contact(LastName = 'NotFirstName'+i,
         //Email='LastName@gmail.com';
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
    public static testMethod void gameBatchtest()
    {
        Test.startTest();
        ScheduleBatchOfGames schedulebatchgame= new ScheduleBatchOfGames();
        String sch='0 0 0 ? * * *';
        System.schedule('Check scheduled status of games', sch, schedulebatchgame);
        Test.stopTest();
    }

}