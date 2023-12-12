/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 19/7/2022
  Description/Purpose: This batch class is to upload files into google drive 
  Apex Class-- SurveyReportUpInGDriveBatch
  
 *
 */
global class SurveyReportUpInGDriveSchedule implements Schedulable,Database.AllowsCallouts {

   global void execute(SchedulableContext sc)
    {
        SurveyReportUpInGDriveBatch repo = new SurveyReportUpInGDriveBatch(); 
        database.executebatch(repo,2000);
        
        
    }
}