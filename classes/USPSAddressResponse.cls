public class USPSAddressResponse {
    public List<Address> Address;

    // Inner class to represent an Address from the response
    public class Address {
        public String ID;
        public String Address1;
        public String Address2;
        public String City;
        public String State;
        public String Zip5;
        public String Zip4;
        public String Error;
        
        // Helper method to check if there is an error in the response
        public Boolean hasError() {
            return (Error != null && Error != '');
        }
    }

    // Method to retrieve a standardized address
    public Address getStandardizedAddress() {
        if (Address != null && !Address.isEmpty()) {
            return Address[0]; // Return the first address in the list
        }
        return null; // No standardized address found
    }
}