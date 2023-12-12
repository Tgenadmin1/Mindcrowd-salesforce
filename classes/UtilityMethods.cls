public without sharing class UtilityMethods {
    public UtilityMethods() {

    }
    public static void ErrorReportToEmail(String  errorMessage)
    {
        String emailAddress=System.Label.Error_Report_To_Email;
        if(!String.isBlank(emailAddress.trim().toLowerCase()))
        {
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {emailAddress};
            mail.setToAddresses(toAddresses);
            mail.setPlainTextBody(errorMessage);
            mail.setSubject('Exception occered');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }
    }
}