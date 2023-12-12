/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 24/6/2022
  Description/Purpose: This  class is to schedule  ReportUpInGDriveBatch for csv file upload in google drive 
  Apex Class-- ReportUpInGDriveBatchSchedule
  
 *
 */

global class ReportUpInGDriveBatchSchedule implements Schedulable,Database.AllowsCallouts {
    
    global void execute(SchedulableContext sc)
    {
        ReportUpInGDriveBatch repo = new ReportUpInGDriveBatch(); 
        database.executebatch(repo,2000);
        
        
    }
}