// Created By: {Girikon(Shweta Khunteta)}
// Created On: 23/08/2021(DD/MM/YYYY
// Description/Purpose: [TM-216]-USED TO schedule Batch class(BatchTrackShipment)
// Methods: {Methods name in class}
// Test Class: {ScheduleBatchTrackShipmentTest} {100%}


global class ScheduleBatchTrackShipment implements Schedulable
{
    global void execute(SchedulableContext sc)
    {
        BatchTrackShipment b= new BatchTrackShipment();
        database.executebatch(b,100);
  
    }
}