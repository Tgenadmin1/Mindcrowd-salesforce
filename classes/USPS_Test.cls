@isTest
public with sharing class USPS_Test {
    public USPS_Test() {

    }
    static testMethod void USPS_Test() {
        Test.setMock(HttpCalloutMock.class, new  USPSHttpCalloutMock());
        Test.StartTest();
		
	USPS.CheckAddress('TEST', '6406 IVY LN', 'Greenbelt','MD' , '20770','1234');
        USPS.CheckAddress('TEST', '6406 IVY LN', 'Greenbelt','' , '20770','1234');
	
		Test.StopTest();
	} // TestUSPS
}