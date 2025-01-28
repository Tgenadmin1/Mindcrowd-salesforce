public class USPSAPIAddressResp {
    public String firm;
    public Address address;
    public AdditionalInfo additionalInfo;
    public String corrections;
    public String matches;
    
    public class Address {
        public String streetAddress;
        public String streetAddressAbbreviation;
        public String secondaryAddress;
        public String city;
        public String cityAbbreviation;
        public String state;
        public String postalCode;
        public String province;
        public String ZIPCode;
        public String ZIPPlus4;
        public String urbanization;
        public String country;
        public String countryISOCode;
    }

    public class AdditionalInfo {
        public String deliveryPoint;
        public String carrierRoute;
        public String DPVConfirmation;
        public String DPVCMRA;
        public String business;
        public String centralDeliveryPoint;
        public String vacant;
    }
    
}