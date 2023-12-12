/*
 * 
  Created By: {Girikon(Pramod Kumar)}
  Created On: 07/01/2021
  Description/Purpose: Community User Creation on updation of Contact[ticket No-: TM-103]
  Apex Class--CommunityUserHandler
  Test Class--CommunityUser_Test
  Modification log --
  Modified By: {Girikon(Pramod Kumar)} 
  Modified On: 07/09/2021

  trigger code on contact for Communtiy user creation
 
  */

trigger CommunityUserCreation_Trigger on Contact(Before insert,after insert, Before update, After update) 
{
    //try{
        if((Trigger.isInsert || Trigger.isUpdate) && Trigger.isBefore){
            for(Contact con : Trigger.new){
                if(con.Secure_GUID__c==null || con.Secure_GUID__c==''){
                    con.Secure_GUID__c = UnsubscribeCtrl.newGuid();                    
                }
                //set activation code only when insert contact record.
                /*if(Trigger.isInsert){
                    con.Activation_Date__c = System.Today();
                }*/
            }
        }

        list<user> lstUsr=new list<user>();//do by vicky
        if(Trigger.isAfter && Trigger.isUpdate){
            Map<Id,Contact> conMap = new Map<Id,Contact>();
            List<String> emailList = new List<String>();
            for(Contact cont : Trigger.new){            
                if(cont.Email != null && Trigger.oldMap.get(cont.Id).Email == null){
                    conMap.put(cont.Id,cont);
                    emailList.add(cont.Email);
                }
            }
            
            Set<String> idSet = new Set<String>();
            if(!conMap.isEmpty() && RecursiveTriggerHandler.runOnce()){
                idSet = CommunityUserHandler.createCommunityUser(conMap,emailList);
            }

            //mindCrowdCustomNotificationController.notifyUsers(idSet);
            if(!idSet.isEmpty()){
                mindCrowdCustomNotificationController.notifyUserStartGames(idSet);
            }
        }
    /*}
    catch(Exception ex)
    {
        System.debug('Error: '+ex.getStackTraceString());
        System.Debug ('Error Message: '+ex.getMessage()+', '+ex.getLinenumber());
    }*/
}