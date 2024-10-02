global class BatchClassSurveyStatus2 implements Database.Batchable<SObject>, Schedulable {

    String objectName;
    String fieldName;
    String conFieldName;

    global BatchClassSurveyStatus2() {}

    // Parameterized constructor
    global BatchClassSurveyStatus2(String objectName, String fieldName, String conFieldName) {
        this.objectName = objectName;
        this.fieldName = fieldName;
        this.conFieldName = conFieldName;
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, ' + fieldName + ' FROM ' + objectName;
        system.debug('Query: ' + query);
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext bc, List<SObject> scope) {
        Set<Id> recordIds = new Set<Id>();

        // Gather record Ids
        for (SObject obj : scope) {
            recordIds.add((Id)obj.get(fieldName));
        }

        // Query records based on the gathered Ids
        String dynamicQuery = 'SELECT Id, ' + conFieldName + ' FROM Contact WHERE Id IN :recordIds';
        system.debug('dynamicQuery: ' + dynamicQuery);
        List<Contact> contactsToUpdate = Database.query(dynamicQuery);

        for (SObject obj : scope) {
            for (Contact contact : contactsToUpdate) {
                if (contact.Id.equals(obj.get(fieldName)) && contact.get(conFieldName) != 'Opened') {
                    contact.put(conFieldName, 'Opened');
                }
            }
        }

        // Update contacts
        if (!contactsToUpdate.isEmpty()) {
            update contactsToUpdate;
        }
    }

    global void finish(Database.BatchableContext context) {
        System.debug('---IN FINISH');
        // Add any finish logic here
    }

    // Implementing the Schedulable interface method
    global void execute(SchedulableContext sc) {
        
        BatchClassSurveyStatus2 surveyHM = new BatchClassSurveyStatus2('HealthMedical_Survey__c', 'Contact_Name__c', 'HEALTH_MEDICAL__c');
		Database.executeBatch(surveyHM);

		BatchClassSurveyStatus2 surveySES = new BatchClassSurveyStatus2('SES__c', 'Contact_Name__c', 'SES__c');
		Database.executeBatch(surveySES);
        
        BatchClassSurveyStatus2 surveyWH = new BatchClassSurveyStatus2('Womens_Health__c', 'Contact_Name__c', 'WOMENS_HEALTH__c');
		Database.executeBatch(surveyWH);
        
        BatchClassSurveyStatus2 surveySE = new BatchClassSurveyStatus2('Subjective_English_Survey__c', 'Contact_Name__c', 'SUBJECTIVE_ENGLISH__c');
		Database.executeBatch(surveySE);

		BatchClassSurveyStatus2 surveyADL = new BatchClassSurveyStatus2('ADL_Survey__c', 'Contact_Name__c', 'ADL__c');
		Database.executeBatch(surveyADL);

        BatchClassSurveyStatus2 surveyDIET = new BatchClassSurveyStatus2('Diet__c', 'Contact_Name__c', 'DIET__c');
		Database.executeBatch(surveyDIET);
        
        BatchClassSurveyStatus2 surveySWLS = new BatchClassSurveyStatus2('Swls_Survey__c', 'Contact_Name__c', 'SWLS__c');
		Database.executeBatch(surveySWLS);
        
        BatchClassSurveyStatus2 surveyQPAR = new BatchClassSurveyStatus2('QPAR__c', 'Contact_Name__c', 'QPAR__c');
		Database.executeBatch(surveyQPAR);
        
        BatchClassSurveyStatus2 surveySOCSTR = new BatchClassSurveyStatus2('Social_Stressor_Survey__c', 'Contact_Name__c', 'SOCIAL_STRESSOR__c');
		Database.executeBatch(surveySOCSTR);
        
        BatchClassSurveyStatus2 surveySOCSUP = new BatchClassSurveyStatus2('Social_Support_Survey__c', 'Contact_Name__c', 'SOCIAL_SUPPORT__c');
		Database.executeBatch(surveySOCSUP);
        
        BatchClassSurveyStatus2 surveyCANCER = new BatchClassSurveyStatus2('Cancer__c', 'Contact_Name__c', 'CANCER__c');
		Database.executeBatch(surveyCANCER);
        
        BatchClassSurveyStatus2 surveyCOVID = new BatchClassSurveyStatus2('COVID_Survey__c', 'Contact__c', 'COVID__c');
		Database.executeBatch(surveyCOVID);
        
        BatchClassSurveyStatus2 surveyBRAIN = new BatchClassSurveyStatus2('Personal_and_Family_History_of_Brain__c', 'Contact__c', 'BRAIN_DISEASE__c');
		Database.executeBatch(surveyBRAIN);
        
        BatchClassSurveyStatus2 surveyFHAD = new BatchClassSurveyStatus2('FHAD_Survey__c', 'Contact__c', 'FHAD__c');
		Database.executeBatch(surveyFHAD);
        
        BatchClassSurveyStatus2 surveySLEEP = new BatchClassSurveyStatus2('Sleep_Survey__c', 'Contact__c', 'SLEEP__c');
		Database.executeBatch(surveySLEEP);
        
        BatchClassSurveyStatus2 surveyPERSTR = new BatchClassSurveyStatus2('Perceived_Stress_Scale__c', 'Contact__c', 'PERCEIVED_STRESS__c');
		Database.executeBatch(surveyPERSTR);
        
        BatchClassSurveyStatus2 surveyANXIETY = new BatchClassSurveyStatus2('Anxiety_Survey__c', 'Contact__c', 'ANXIETY__c');
		Database.executeBatch(surveyANXIETY);

    }
}