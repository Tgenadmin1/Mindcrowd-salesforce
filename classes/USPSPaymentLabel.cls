public class USPSPaymentLabel {
	public String roleName;
    public String CRID;
    public String MID;
    public String manifestMID;
    public String accountType;
    public String accountNumber;
    //public String endPointURL;

	public class USPSPaymentWrapper{
    	public List<USPSPaymentLabel> roles;
	}
    
}


/*system.debug('Roll Name Payer :'+USPSPayment.rollNameP);
        system.debug('Roll Name Label_Owner :'+USPSPayment.rollNameLO);
        system.debug('CRID :'+USPSPayment.CRID);
        system.debug('MID :'+USPSPayment.MID);
        system.debug('Manifest MID :'+USPSPayment.manifestMID);
        system.debug('Account Type :'+USPSPayment.accountType);
        system.debug('Account Number :'+USPSPayment.accountNumber);
        system.debug('EndPoint Actual :'+USPSPayment.endPointURL); */
/*
        String body1 = 'roleName=' + EncodingUtil.urlEncode(USPSPaymentP.rollNameP, 'UTF-8') +
                       '&CRID=' + EncodingUtil.urlEncode(USPSPaymentP.CRID, 'UTF-8') +
                       '&MID=' + EncodingUtil.urlEncode(USPSPaymentP.MID, 'UTF-8') +
                       '&manifestMID=' + EncodingUtil.urlEncode(USPSPaymentP.manifestMID, 'UTF-8') +
                       '&accountType=' + EncodingUtil.urlEncode(USPSPaymentP.accountType, 'UTF-8') +
                       '&accountNumber=' + EncodingUtil.urlEncode(USPSPaymentP.accountNumber, 'UTF-8');
        //requestBody.add(body1);

        String body2 = 'roleName=' + EncodingUtil.urlEncode(USPSPayment.rollNameLO, 'UTF-8') +
                       '&CRID=' + EncodingUtil.urlEncode(USPSPayment.CRID, 'UTF-8') +
                       '&MID=' + EncodingUtil.urlEncode(USPSPayment.MID, 'UTF-8') +
                       '&manifestMID=' + EncodingUtil.urlEncode(USPSPayment.manifestMID, 'UTF-8') +
                       '&accountType=' + EncodingUtil.urlEncode(USPSPayment.accountType, 'UTF-8') +
                       '&accountNumber=' + EncodingUtil.urlEncode(USPSPayment.accountNumber, 'UTF-8');
        //requestBody.add(body2);
        //String bodyString = requestBody.join('&'); // Join with '&' for form-url-encoded body
        String requestBody = body1 + '&' + body2; */