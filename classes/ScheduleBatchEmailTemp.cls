/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 30/05/2022
  Description/Purpose:to schedule ScheduleBatchEmailTempBatch the class at 4am every day 
  Test Class-- ScheduleBatchEmailTempTest
 *
 */

public class ScheduleBatchEmailTemp implements Schedulable {
    public void execute(SchedulableContext sc) {
        ScheduleBatchEmailTempBatch b = new ScheduleBatchEmailTempBatch(); 
        database.executebatch(b,150);
    }
}