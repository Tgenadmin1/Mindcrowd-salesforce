public class sendNotification {

    Public static void sendNotification()
{
   User userInfo = [SELECT Id, Email from User where email='sibisathyangs@gmail.com'];
   Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
   message.setTargetObjectId(userInfo.id);
   OrgWideEmailAddress owa =  [select id, DisplayName from OrgWideEmailAddress where DisplayName='Mindcrowd Admin 2'];
   message.setOrgWideEmailAddressId(owa.Id);
   //message.setSenderDisplayName('Company Support');
   message.setSaveAsActivity(false);
   EmailTemplate emailTemplate =[Select Id,Subject,Description, HtmlValue,DeveloperName,Body
                                 from EmailTemplate where name =
                                 'Become VIP Reminder Template'];


   message.setTemplateID(emailTemplate.Id);
   message.setWhatId(userInfo.Id); 
   message.toAddresses = new String[] { userInfo.email};

   Messaging.SingleEmailMessage[] messages = new  List<Messaging.SingleEmailMessage> {message};

   Messaging.SendEmailResult[] results =   Messaging.sendEmail(messages);
 
 if (results[0].success)
 {
   System.debug('The email was sent successfully.'+results[0]);
     System.debug('results: '+results);
 }
 else
 {
   System.debug('The email failed to send:' + results[0].errors[0].message);
 }
}
}