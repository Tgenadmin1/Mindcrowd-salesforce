@isTest
public with sharing class USPSAddress_Test 
{
    
    static testMethod void USPSAddress_Test() 
    {
		Test.StartTest();
        USPSAddress MyAddress = new USPSAddress();
        // test the hasdata method
        MyAddress.HasData();
        MyAddress.Address1 = '6406 IVY LN';
        MyAddress.HasData();
        MyAddress.Address1 = '';
        MyAddress.Address2 = '6406 IVY LN';
        MyAddress.HasData();
        MyAddress.Address2 = '';
        MyAddress.City = 'Greenbelt';
        MyAddress.HasData();			
        MyAddress.City = '';
        MyAddress.State = 'MD';
        MyAddress.HasData();			
        MyAddress.State = '';
        MyAddress.Zip5 = '20770';
        MyAddress.HasData();			
        MyAddress.Zip5 = '';
        MyAddress.Zip4 = '1441';
        MyAddress.HasData();			
        MyAddress.Zip4 = '';
        MyAddress.USPS_Returned_Error = true;
        MyAddress.HasData();
        MyAddress.USPS_Returned_Error = false;
        MyAddress.USPS_ERROR_CODE = 'Test';
        MyAddress.HasData();
        MyAddress.USPS_ERROR_CODE = '';
        MyAddress.USPS_ERROR_DESC = 'Test';
        MyAddress.HasData();
        MyAddress.USPS_ERROR_DESC = '';
        MyAddress.USPS_ERROR_SOURCE = 'Test';
        MyAddress.HasData();
         // the object should now be empty for other testing ...
        MyAddress.USPS_ERROR_SOURCE = '';
        // end testing of has data method

        // test CanCheckAddress method			
            // MyAddress.Address2 = '6406 IVY LN';
            // MyAddress.Zip5 = '20770';
            // MyAddress.CanCheckAddress();

            // MyAddress.Zip5 = '';
            // MyAddress.City = 'Greenbelt';
            // MyAddress.State = 'MD';
            // MyAddress.CanCheckAddress();
        // end testing of CanCheckAddress method
        
        // Test GetZip Method
            MyAddress.Zip5 = '20770';			
            MyAddress.Zip4 = '1441';
            MyAddress.getZip();
        // end testing of GetZip Method
        
        Test.StopTest();
    } // TestUSPSAddress
}