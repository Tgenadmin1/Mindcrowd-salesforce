public class SendEmailSibi {
    
    public static void sendEmail(String debugtext){
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
message.toAddresses = new String[] { 'ssathyan@miraclesoft.com' };
message.subject = 'Error';
message.plainTextBody = debugtext;
Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);

if (results[0].success) {
    System.debug('The email was sent successfully.');
} else {
    System.debug('The email failed to send: ' + results[0].errors[0].message);
}
    }

}