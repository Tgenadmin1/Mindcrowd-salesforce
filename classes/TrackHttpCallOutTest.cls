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
                /*XMLValue = '<?xml version=\"1.0\"?><TrackResponse><TrackInfo ID="Test">';
                XMLValue += '<StatusCategory>Delivered</StatusCategory>';
                XMLValue += '<StatusSummary>Your item was delivered at the front door or porch at 10:03 am on June 2, 2021 in SAINT LOUIS, MO 63135.</StatusSummary>';
                XMLValue += '<TrackSummary><EventCode>01</EventCode>';
			    XMLValue += '</TrackSummary></TrackInfo></TrackResponse>';*/
                ReturnValue.setStatusCode(200);
            
		    } 
            //ReturnValue.setBody(XMLValue);
            ReturnValue.setBody('{"status":"Delivered, PO Box","statusCategory":"Delivered","statusSummary":"Your item has been delivered and is available at a PO Box at 9:58 am on October 30, 2024 in PALMDALE, FL 33944.","trackingEvents":[{"eventType":"Delivered, PO Box","eventTimestamp":"2024-10-30T09:58:00","GMTTimestamp":"2024-10-30T13:58:27Z","GMTOffset":"-04:00","eventCountry":null,"eventCity":"PALMDALE","eventState":"FL","eventZIP":"33944","firm":null,"name":null,"authorizedAgent":"false","eventCode":"01","additionalProp":null}],"trackingNumber":"9200190308896900052939"}');
            return ReturnValue;
    }
            
}