global class BatchContactGameStatusUpdate implements Database.Batchable<SObject>, Schedulable {
    
    
    global void execute(SchedulableContext sc) {
        BatchContactGameStatusUpdate GameUn = new BatchContactGameStatusUpdate();
        Database.executeBatch(GameUn);
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {   
        //Step - 1 : Get All the PGI records / contacts
        return Database.getQueryLocator([Select id, Game_Name__r.Name,Contact_Name__r.Id, Contact_Name__c, Game_Name__c
										FROM Participant_Game_Info__c 
										WHERE
										((Game_Name__r.Name IN ('Flanker', 'Letter-Number Sequencing', 'Keep Track', 'Deary Simple And Complex Reaction Time')
													AND CreatedDate = N_DAYS_AGO:91)
										OR (Game_Name__r.Name IN ('Object Discrimination', 'Object Temporal', 'Face-Name Associates', 'Object Spatial') 
													AND CreatedDate = N_DAYS_AGO:183)
										OR (Game_Name__r.Name IN ('Verbal Paired Associates', 'Object Recognition And Similarity') 
													AND CreatedDate = N_DAYS_AGO:365))
													AND Contact_Name__r.Project2_Enrollment_Date__c = null
                                                    ]);  
   
    }

    global void execute(Database.BatchableContext bc, List<Participant_Game_Info__c> scope) {
       
        //Step - 2 : In execute method get All unique contact Ids from scope and store in below variable List<Id> contIds;
        
        Set<Id> contactIds = new Set<Id>();
		for (Participant_Game_Info__c pgi : scope) {
        contactIds.add(pgi.Contact_Name__r.Id);
    	}
        
        //Step - 3 : Run a query to get all contact with all 10 game status fields using above contactIds
        
    	List<Id> contIds = new List<Id>(contactIds);
    	List<Contact> contUpd = [SELECT Flanker__c, Letter_Number_Sequencing__c, Keep_Track__c, Deary_Simple_And_Complex_Reaction_Time__c,
								Object_Discrimination__c, Object_Temporal__c, Face_Name_Associates__c, Object_Spatial__c,
								Verbal_Paired_Associates__c, Object_Recognition_And_Similarity__c FROM Contact WHERE Id IN :contIds];
        
        //Step - 4 : Loop throgh the PGI records and write if condition for each game and update the correpsonding status field in contUpd
    
		for(Participant_Game_Info__c pgi : scope) {    
            for(Contact con : contUpd) {
                if(con.Id == pgi.Contact_Name__r.Id) {
                    
				if(pgi.Game_Name__r.Name == 'Flanker' && con.Flanker__c != 'Opened') {
                        con.Flanker__c = 'Opened';

                } else if(pgi.Game_Name__r.Name == 'Verbal Paired Associates' && con.Verbal_Paired_Associates__c != 'Opened'){
                        con.Verbal_Paired_Associates__c = 'Opened';

                } else if(pgi.Game_Name__r.Name == 'Letter-Number Sequencing' && con.Letter_Number_Sequencing__c != 'Opened'){
                        con.Letter_Number_Sequencing__c = 'Opened';

                } else if(pgi.Game_Name__r.Name == 'Deary Simple And Complex Reaction Time' && con.Deary_Simple_And_Complex_Reaction_Time__c != 'Opened'){
                        con.Deary_Simple_And_Complex_Reaction_Time__c = 'Opened';

				} else if(pgi.Game_Name__r.Name == 'Keep Track' && con.Keep_Track__c != 'Opened'){
                        con.Keep_Track__c = 'Opened';

				} else if(pgi.Game_Name__r.Name == 'Object Recognition And Similarity' && con.Object_Recognition_And_Similarity__c != 'Opened'){
                        con.Object_Recognition_And_Similarity__c = 'Opened';

				} else if(pgi.Game_Name__r.Name == 'Object Discrimination' && con.Object_Discrimination__c != 'Opened'){
                        con.Object_Discrimination__c = 'Opened';

				} else if(pgi.Game_Name__r.Name == 'Object Temporal' && con.Object_Temporal__c != 'Opened'){
                        con.Object_Temporal__c = 'Opened';

				} else if(pgi.Game_Name__r.Name == 'Face-Name Associates' && con.Face_Name_Associates__c != 'Opened'){
                        con.Face_Name_Associates__c = 'Opened';

				} else if(pgi.Game_Name__r.Name == 'Object Spatial' && con.Object_Spatial__c != 'Opened'){
                        con.Object_Spatial__c = 'Opened';

				} 
			}
		}    
     }
        
     Database.SaveResult[] srList = database.update(contUpd, false);

		for (Database.SaveResult sr : srList) {
    	 if (!sr.isSuccess()) {              
          for(Database.Error err : sr.getErrors()) {
            String description =  'Error occured updating record: '+sr.getId()+'- Error Message: '+err.getMessage();
            ExceptionLogHandler.logException(null,'BatchContactGameStatusUpdate','Execute',description);                
          }
         }
       }
        
	}

	global void finish(Database.BatchableContext context) {
        System.debug('---IN FINISH');
    }
}