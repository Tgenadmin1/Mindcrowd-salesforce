public class sendNotificationMass {

    public static void sendMassEmail() {
        List<User> users = [SELECT Id, Email FROM User WHERE email IN ('sibisathyangs@gmail.com', 'mindcrowdtestuser@gmail.com')];
        List<Id> userIds = new List<Id>();
        
        for (User userInfo : users) {
            userIds.add(userInfo.Id);
        }
        
        Messaging.MassEmailMessage massEmail = new Messaging.MassEmailMessage();
        massEmail.setTargetObjectIds(userIds);
        
        //OrgWideEmailAddress owa = [SELECT Id FROM OrgWideEmailAddress WHERE DisplayName = 'Mindcrowd Admin 2'];
        //massEmail.setOrgWideEmailAddressId(owa.Id);
        
        EmailTemplate emailTemplate = [SELECT Id FROM EmailTemplate WHERE DeveloperName = 'Become_VIP_Reminder_Template'];
        massEmail.setTemplateId(emailTemplate.Id);
        
        Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.MassEmailMessage[] {massEmail});
        
        if (results[0].success) {
            System.debug('The mass email was sent successfully: ' + results[0]);
        } else {
            System.debug('The mass email failed to send: ' + results[0].errors[0].message);
        }
    }
}