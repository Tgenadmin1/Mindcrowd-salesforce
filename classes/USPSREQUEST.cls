public with sharing class USPSREQUEST {
    
    public USPSREQUEST(){
        secondaryAddress = ''; 	
        firstName = ''; 
        email = ''; 
        imageInfo = null; 
        containerID = ''; 
        sortType = ''; 
        packageValue = 0; 
        nonDeliveryOption = ''; 
        contentType = ''; 
        generateGXEvent = false; 
        ancillaryServiceEndorsements = ''; 
        referenceNumber = '';
        streetAddress = ''; 
        ZIPPlus4 = ''; 
        phone = '';  
        imageType = ''; 
        labelType = ''; 
        shipInfo = false; 
        receiptOption = ''; 
        state = ''; 
        ZIPCode = ''; 
        lastName = '';  
        firm = ''; 
        ignoreBadAddress = false;  
        parcelLockerDelivery = false;
        holdForPickup = false; 
        facilityId = '';  
        weight = 0;  
        length = 0; 
        height = 0; 
        width = 0; 
        girth = 0; 
        mailClass = ''; 
        processingCategory = '';  
        destinationEntryFacilityType = ''; 
        mailingDate = '';  
        carrierRelease = false; 
        physicalSignatureRequired = false; 
        inductionZIPCode = ''; 
        rateIndicator = '';  
        city = ''; 
        extraServices = new List<Integer>(); 
        contentComments = ''; 
        restrictionType = ''; 
        restrictionComments = ''; 
        AESITN = ''; 
        invoiceNumber = ''; 
        licenseNumber = ''; 
        certificateNumber = ''; 
        customsContentType = ''; 
        importersReference = ''; 
        importersContact = ''; 
        exportersReference = ''; 
        exportersContact = ''; 
        itemDescription = ''; 
        itemQuantity = 0; 
        itemValue = 0; 
        itemWeight = 0.0; 
        itemTotalWeight = 0.0; 
        HSTariffNumber = ''; 
        countryofOrigin = ''; 
        itemCategory = ''; 
        itemSubcategory = ''; 
    }
    
    @AuraEnabled public String secondaryAddress { get; set; } 	
    @AuraEnabled public String firstName { get; set; } 
    @AuraEnabled public String email { get; set; } 
    @AuraEnabled public Blob imageInfo { get; set; }
    @AuraEnabled public String containerID { get; set; } 
    @AuraEnabled public String sortType { get; set; }
    @AuraEnabled public Integer packageValue { get; set; } 
    @AuraEnabled public String nonDeliveryOption { get; set; } 
    @AuraEnabled public String contentType { get; set; } 
    @AuraEnabled public Boolean generateGXEvent { get; set; } 
    @AuraEnabled public String ancillaryServiceEndorsements { get; set; } 
    @AuraEnabled public String referenceNumber { get; set; } 
    @AuraEnabled public String streetAddress { get; set; } 
    @AuraEnabled public String ZIPPlus4 { get; set; } 
    @AuraEnabled public String phone { get; set; } 
    @AuraEnabled public String imageType { get; set; } 
    @AuraEnabled public String labelType { get; set; } 
    @AuraEnabled public Boolean shipInfo { get; set; } 
    @AuraEnabled public String receiptOption { get; set; } 
    @AuraEnabled public String state { get; set; } 
    @AuraEnabled public String ZIPCode { get; set; } 
    @AuraEnabled public String lastName { get; set; } 
    @AuraEnabled public String firm { get; set; } 
    @AuraEnabled public Boolean ignoreBadAddress { get; set; } 
    @AuraEnabled public Boolean parcelLockerDelivery { get; set; } 
    @AuraEnabled public Boolean holdForPickup { get; set; } 
    @AuraEnabled public String facilityId { get; set; } 
    @AuraEnabled public Integer weight { get; set; } 
    @AuraEnabled public Integer length { get; set; } 
    @AuraEnabled public Integer height { get; set; } 
    @AuraEnabled public Integer width { get; set; } 
    @AuraEnabled public Integer girth { get; set; } 
    @AuraEnabled public String mailClass { get; set; } 
    @AuraEnabled public String processingCategory { get; set; } 
    @AuraEnabled public String destinationEntryFacilityType { get; set; } 
    @AuraEnabled public String mailingDate { get; set; } 
    @AuraEnabled public Boolean carrierRelease { get; set; } 
    @AuraEnabled public Boolean physicalSignatureRequired { get; set; } 
    @AuraEnabled public String inductionZIPCode { get; set; } 
    @AuraEnabled public String rateIndicator { get; set; } 
    @AuraEnabled public String city { get; set; } 
    @AuraEnabled public List<Integer> extraServices { get; set; } 
    @AuraEnabled public String contentComments { get; set; }
    @AuraEnabled public String restrictionType { get; set; }
    @AuraEnabled public String restrictionComments { get; set; }
    @AuraEnabled public String AESITN { get; set; }
    @AuraEnabled public String invoiceNumber { get; set; }
    @AuraEnabled public String licenseNumber { get; set; }
    @AuraEnabled public String certificateNumber { get; set; }
    @AuraEnabled public String customsContentType { get; set; }
    @AuraEnabled public String importersReference { get; set; }
    @AuraEnabled public String importersContact { get; set; }
    @AuraEnabled public String exportersReference { get; set; }
    @AuraEnabled public String exportersContact { get; set; }
    @AuraEnabled public String itemDescription { get; set; }
    @AuraEnabled public Integer itemQuantity { get; set; }
    @AuraEnabled public Integer itemValue { get; set; }
    @AuraEnabled public Double itemWeight { get; set; }
    @AuraEnabled public Double itemTotalWeight { get; set; }
    @AuraEnabled public String HSTariffNumber { get; set; }
    @AuraEnabled public String countryofOrigin { get; set; }
    @AuraEnabled public String itemCategory { get; set; }
    @AuraEnabled public String itemSubcategory { get; set; }
}