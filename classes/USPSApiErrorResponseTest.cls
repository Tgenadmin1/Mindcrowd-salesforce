@isTest
public class USPSApiErrorResponseTest {
    @isTest
    static void testDeserialization() {
        // Sample JSON response to simulate an error from the USPS API
        String jsonResponse = '{"apiVersion": "1.0", "error": {"code": "INVALID_ADDRESS", "message": "The address provided is not valid.", "errors": [{"title": "Invalid Address", "detail": "The street address is incomplete.", "source": "USPS API"}]}}';

        // Deserialize the JSON response into a USPSApiErrorResponse object
        USPSApiErrorResponse errorResponse = (USPSApiErrorResponse) JSON.deserialize(jsonResponse, USPSApiErrorResponse.class);
        
        // Assert that the values are correctly deserialized
        System.assertEquals('1.0', errorResponse.apiVersion);
        System.assertEquals('INVALID_ADDRESS', errorResponse.error.code);
        System.assertEquals('The address provided is not valid.', errorResponse.error.message);
        System.assertEquals(1, errorResponse.error.errors.size());
        
        // Validate the details of the first error
        USPSApiErrorResponse.Errors firstError = errorResponse.error.errors[0];
        System.assertEquals('Invalid Address', firstError.title);
        System.assertEquals('The street address is incomplete.', firstError.detail);
        System.assertEquals('USPS API', firstError.source);
    }
}