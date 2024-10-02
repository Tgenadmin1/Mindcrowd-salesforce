public with sharing class USPSRESPONSE {
    
    public USPSRESPONSE() {
        streetAddress = '';	
        streetAddressAbbreviation = '';
        secondaryAddress = '';
        cityAbbreviation = '';
        city = '';
        state = '';
        ZIPCode = '';
        ZIPPlus4 = '';
        firstName = '';
     //   commitment = new Commitment(); 
        labelImage = '';
        receiptImage = '';
        price = 0;
        name = '';
        scheduleDeliveryDate = '';
        routingInformation = '';
        trackingNumber = '';
        SKU = '';
        postage = 0;
      //  extraServices = new List<extraServices>();
        zone = '';
        weight = 0;
      //  fees = new List<ExtraServices>();
    }

    @AuraEnabled public String streetAddress { get; set; }	
    @AuraEnabled public String streetAddressAbbreviation { get; set; }
    @AuraEnabled public String secondaryAddress { get; set; }
    @AuraEnabled public String cityAbbreviation { get; set; }
    @AuraEnabled public String city { get; set; }
    @AuraEnabled public String state { get; set; }
    @AuraEnabled public String ZIPCode { get; set; }
    @AuraEnabled public String ZIPPlus4 { get; set; }
    @AuraEnabled public String firstName { get; set; }
 //  @AuraEnabled public Commitment commitment { get; set; }
    @AuraEnabled public String labelImage { get; set; }
    @AuraEnabled public String receiptImage { get; set; }
    @AuraEnabled public Integer price { get; set; }
    @AuraEnabled public String name { get; set; }
    @AuraEnabled public String scheduleDeliveryDate { get; set; }
    @AuraEnabled public String routingInformation { get; set; }
    @AuraEnabled public String trackingNumber { get; set; }
    @AuraEnabled public String SKU { get; set; }
    @AuraEnabled public Integer postage { get; set; }
 //   @AuraEnabled public List<ExtraServices> extraServices { get; set; }
    @AuraEnabled public String zone { get; set; }
    @AuraEnabled public Integer weight { get; set; }
  //  @AuraEnabled public List<ExtraServices> fees { get; set; }
}