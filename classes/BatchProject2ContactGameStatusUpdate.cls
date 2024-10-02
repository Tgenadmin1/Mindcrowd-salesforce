global class BatchProject2ContactGameStatusUpdate implements Database.Batchable<SObject>, Schedulable {
    
    
    global void execute(SchedulableContext sc) {
        BatchProject2ContactGameStatusUpdate GameUn = new BatchProject2ContactGameStatusUpdate();
        Database.executeBatch(GameUn);
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {   
        return Database.getQueryLocator([Select id,Flanker__c, Letter_Number_Sequencing__c, Keep_Track__c, 
                                         Deary_Simple_And_Complex_Reaction_Time__c,	Object_Discrimination__c, 
                                         Object_Temporal__c, Face_Name_Associates__c, Object_Spatial__c,
                                         Verbal_Paired_Associates__c, Object_Recognition_And_Similarity__c 
										 FROM Contact
										 WHERE Project2_Enrollment_Date__c = N_DAYS_AGO:730
                                         AND Project2_Enrollment_Date__c != null
                                         AND Language__c='English'
                                         AND (Flanker__c != 'Opened' OR Verbal_Paired_Associates__c != 'Opened'
                                              OR Letter_Number_Sequencing__c != 'Opened' OR Keep_Track__c != 'Opened'
                                              OR Deary_Simple_And_Complex_Reaction_Time__c != 'Opened' 
                                              OR Object_Temporal__c != 'Opened'OR Object_Recognition_And_Similarity__c != 'Opened' 
                                              OR Object_Discrimination__c != 'Opened'OR Face_Name_Associates__c != 'Opened' 
                                              OR Object_Spatial__c != 'Opened')]);   
    }

    global void execute(Database.BatchableContext bc, List<Contact> scope) {
        List<Contact> contUpd = new List<Contact>();    
		for(Contact con: scope) {  
            	Boolean isContUpd = false;
				if(con.Flanker__c != 'Opened') {
                    con.Flanker__c = 'Opened';
                    isContUpd=true;
                } 
            
                if(con.Verbal_Paired_Associates__c != 'Opened'){
                   con.Verbal_Paired_Associates__c = 'Opened';
                    isContUpd=true;
                } 
            
                if(con.Letter_Number_Sequencing__c != 'Opened'){
                   con.Letter_Number_Sequencing__c = 'Opened';
                    isContUpd=true;
                } 
            
                if(con.Deary_Simple_And_Complex_Reaction_Time__c != 'Opened'){
                    con.Deary_Simple_And_Complex_Reaction_Time__c = 'Opened';
                    isContUpd=true;
				} 
            
                if(con.Keep_Track__c != 'Opened'){
                   con.Keep_Track__c = 'Opened';
                   isContUpd=true;
				} 
            
                if(con.Object_Recognition_And_Similarity__c != 'Opened'){
                   con.Object_Recognition_And_Similarity__c = 'Opened';
                   isContUpd=true;
				} 
            
                if(con.Object_Discrimination__c != 'Opened'){
                   con.Object_Discrimination__c = 'Opened';
                   isContUpd=true;
				} 
            
                if(con.Object_Temporal__c != 'Opened'){
                   con.Object_Temporal__c = 'Opened';
                   isContUpd=true;
				}       
            
                if(con.Face_Name_Associates__c != 'Opened'){
                   con.Face_Name_Associates__c = 'Opened';
                   isContUpd=true;
				} 
            
                if(con.Object_Spatial__c != 'Opened'){
                   con.Object_Spatial__c = 'Opened';
                   isContUpd=true;
				} 
            if(isContUpd){
                contUpd.add(con);
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