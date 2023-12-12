// Created By: {Girikon(Shweta Khunteta)}
// Created On: 23/08/2021 (DD/MM/YYYY)
// Description/Purpose: test class for testing ScheduledBatchTrackShipment
// Methods: {Methods name in class}
// Apex Class: {ScheduledBatchTrackShipment}

@isTest
public with sharing class ScheduleBatchTrackShipmentTest {
    public static testMethod void testschedule()
    {
        Test.startTest();
        ScheduleBatchTrackShipment testschedulebatch= new ScheduleBatchTrackShipment();
        String sch='0 0 0 ? * * *';
        System.schedule('check scheduled status', sch, testschedulebatch);
        Test.stopTest();
    }
}