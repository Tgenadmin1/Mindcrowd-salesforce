// Created By: {Girikon(ShwetaKhunteta)}
// Created On: 07/09/2021
// Description/Purpose:Test class created for Wrapper class USPSTrack.{TM-85}
// Methods: {HasData}
// Apex Class: {USPSTrack)}
@isTest
public with sharing class USPSTrackTest 
{
    public USPSTrackTest() 
    {

    }
    static testMethod void USPSTrack_Test() 
    {
        Test.StartTest();
        USPSTrack trackdetails = new USPSTrack();
        
        // test the hasdata method
            trackdetails.HasData();
            trackdetails.EventCode = '01';
            trackdetails.HasData();
            trackdetails.EventCode = '';
            trackdetails.StatusCategory = 'Test';
            trackdetails.HasData();
            trackdetails.StatusCategory = '';
            trackdetails.USPS_Returned_Error = true;
            trackdetails.HasData();
            trackdetails.USPS_Returned_Error = false;
            trackdetails.USPS_ERROR_CODE = 'Test';
            trackdetails.HasData();
            trackdetails.USPS_ERROR_CODE = '';
            trackdetails.USPS_ERROR_DESC = 'Test';
            trackdetails.HasData();
            trackdetails.USPS_ERROR_DESC = '';
            trackdetails.USPS_ERROR_SOURCE = 'Test';
            trackdetails.HasData();
        // the object should now be empty for other testing ...
            trackdetails.USPS_ERROR_SOURCE = '';
            Test.StopTest();
    } //
}