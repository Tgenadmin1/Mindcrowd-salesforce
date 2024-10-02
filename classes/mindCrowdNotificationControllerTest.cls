@isTest
public class mindCrowdNotificationControllerTest {
    public static testMethod  void createUser(){
       
      Id profileId = [Select Id From Profile Where Name ='System Administrator'].Id;
        User u = TestUtility.createUser('',profileId,'Amit','Singh');
        System.runAs( u ){
            Account acc = TestUtility.createAccount('Test Account');
            insert acc;
        }
    }
    
    @isTest
    public static void createCommunityUser(){
        /* Query Community User Profile */
        Id profileId = [Select Id From Profile Where Name ='Customer Community Login User Custom'].Id;
        Account acc = TestUtility.createAccount('Test Account');
        insert acc;
        Contact con = TestUtility.createContact('test','Contact','test@gmail.com',acc.Id,'Opened','Opened','Opened','Opened','Opened','Opened','Opened','Opened','Opened','Opened');
        
        insert con;
        User u = TestUtility.createCommunityUser(con.Id,profileId,'Amit','Singh');
        system.debug('u'+u);
        system.debug('u.id'+u.id);
          Set<String>  recipientsIds=new Set<String>();
          List<User> currUser =[SELECT Username, ContactId, Id FROM User Where ContactId=:con.Id];
        system.debug('recipientsIds'+currUser);
        for(User ur:currUser){
                recipientsIds.Add(ur.Id);      
            }
        
        List<Game_Detail__c> lgame=new List<Game_Detail__c>();
        
            Game_Detail__c game1=new Game_Detail__c(Name='Deary Simple And Complex Reaction Time',Reactivation_Days__c=10,Dependency__c='');
            insert game1;
            lgame.add(game1); 
            Game_Detail__c game2=new Game_Detail__c(Name='Verbal Paired Associates',Reactivation_Days__c=10,Dependency__c='');
            insert game2;
            lgame.add(game2);
            Game_Detail__c game3=new Game_Detail__c(Name='Object Recognition And Similarity',Reactivation_Days__c=10,Dependency__c='');
            insert game3;
            lgame.add(game3);
            Game_Detail__c game4=new Game_Detail__c(Name='Flanker',Reactivation_Days__c=10,Dependency__c='');
            insert game4;
            lgame.add(game4);
            Game_Detail__c game5=new Game_Detail__c(Name='Face-Name Associates',Reactivation_Days__c=10,Dependency__c='');
            insert game5;
            lgame.add(game5);
            Game_Detail__c game6=new Game_Detail__c(Name='Letter-Number Sequencing',Reactivation_Days__c=10,Dependency__c='');
            insert game6;
            lgame.add(game6);
            Game_Detail__c game7=new Game_Detail__c(Name='Keep Track',Reactivation_Days__c=10,Dependency__c='');
            insert game7;
            lgame.add(game7);
            Game_Detail__c game8=new Game_Detail__c(Name='Object Discrimination',Reactivation_Days__c=10,Dependency__c='');
            insert game8;
            lgame.add(game8);
            Game_Detail__c game9=new Game_Detail__c(Name='Object Temporal',Reactivation_Days__c=10,Dependency__c='');
            insert game9;
            lgame.add(game9);
             Game_Detail__c game10=new Game_Detail__c(Name='Object Spatial',Reactivation_Days__c=10,Dependency__c='');
             insert game10;
             lgame.add(game10);
        Game_Detail__c game11=new Game_Detail__c(Name='Digits',Reactivation_Days__c=10,Dependency__c='');
             insert game11;
             lgame.add(game11);
           Game_Detail__c game12=new Game_Detail__c(Name='Bean Game',Reactivation_Days__c=10,Dependency__c='');
             insert game12;
             lgame.add(game12);
             Game_Detail__c game13=new Game_Detail__c(Name='Tell Me',Reactivation_Days__c=10,Dependency__c='');
             insert game13;
             lgame.add(game13);
             Game_Detail__c game14=new Game_Detail__c(Name='Tell Me More',Reactivation_Days__c=10,Dependency__c='');
             insert game14;
             lgame.add(game14);
             Game_Detail__c game15=new Game_Detail__c(Name='Fake News',Reactivation_Days__c=10,Dependency__c='');
             insert game15;
             lgame.add(game15);
             Game_Detail__c game16=new Game_Detail__c(Name='This & That',Reactivation_Days__c=10,Dependency__c='');
             insert game16;
             lgame.add(game16);
        for(Game_Detail__c lgameCheck:lgame){
             mindCrowdCustomNotificationController.notifyUserOtherGames(con.Id,lgameCheck.Name);
        }
        
        
        
        
        // Set<String> idSet = new Set<String>{'00501000001CzJ3AAK'};
          //   Set<String> idSet1 = new Set<String>{'00501000001fmvl'};
            Messaging.CustomNotification notification = new Messaging.CustomNotification();
         String title='Please enter title';
        string body='please play game';
     //mindCrowdCustomNotificationController.notifyUsers(recipientsIds); 
         // Create a new custom notification
        Messaging.CustomNotification notification1 = new Messaging.CustomNotification();

        // Set the contents for the notification
        notification1.setTitle('Apex Custom Notification');
        notification1.setBody('The notifications are coming from INSIDE the Apex!');

        mindCrowdCustomNotificationController.notifyUserStartGames(recipientsIds);
         // Create a new custom notification
        Messaging.CustomNotification notification2 = new Messaging.CustomNotification();

        // Set the contents for the notification
        notification2.setTitle('Apex Custom Notification');
        notification2.setBody('The notifications are coming from INSIDE the Apex!');
       mindCrowdCustomNotificationController.notifyUserfrombatch(recipientsIds);
		Contact cont = [select Id from Contact][0];
        mindCrowdCustomNotificationController.notifyUserActivatedGames(cont.Id, 'Flanker');
        mindCrowdCustomNotificationController.notifyUserActivatedGames(cont.Id, 'Keep Track');
    }
        
        
        
        
        
      /* @isTest 
    public static  void  notification(){   
        String title='Please enter title';
        string body='please play game';
        Set<String> idSet = new Set<String>{'00501000001CzJ3AAK'};
            Messaging.CustomNotification notification = new Messaging.CustomNotification(); 
        notification.setTitle(title);
        notification.setBody(body);
    }
        Test.startTest();
        
       // mindCrowdCustomNotificationController.notifyUsers(idSet);
      // mindCrowdCustomNotificationController.notifyUserOtherGames(con.Id);
        Test.stopTest();*/
        
    }