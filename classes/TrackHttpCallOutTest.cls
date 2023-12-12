@isTest
global with sharing class TrackHttpCallOutTest implements HttpCalloutMock
{
    public TrackHttpCallOutTest() 
    {

    }
    
    global HTTPResponse respond(HTTPRequest req) 
    {
		string IncomingRequest = req.getEndpoint(); 		
		system.debug('Incoming EndPoint: ' + IncomingRequest);
		System.Httpresponse ReturnValue = new System.Httpresponse();
		string XMLValue = '';
    	// to increase test coverage, we vary our response when certain key words are present
    	if (IncomingRequest.contains('ERROR')) {
             XMLValue = '<?xml version=\"1.0\"?><TrackResponse><TrackInfo ID="LY715000151CN">';
                XMLValue += '<Error><Number>-2147219283</Number>';
                XMLValue += '<Description>A status update is not yet available on your package. It will be available when the shipper provides an update or the package is delivered to USPS. Check back soon. Sign up for Informed Delivery. to receive notifications for packages addressed to you.</Description>';
                XMLValue += '</Error></TrackInfo></TrackResponse>';
            } else {
                XMLValue = '<?xml version=\"1.0\"?><TrackResponse><TrackInfo ID="Test">';
                XMLValue += '<StatusCategory>Delivered</StatusCategory>';
                XMLValue += '<StatusSummary>Your item was delivered at the front door or porch at 10:03 am on June 2, 2021 in SAINT LOUIS, MO 63135.</StatusSummary>';
                XMLValue += '<TrackSummary><EventCode>01</EventCode>';
			    XMLValue += '</TrackSummary></TrackInfo></TrackResponse>';
            
		    } 
            ReturnValue.setBody(XMLValue);
            return ReturnValue;
    }
            
}