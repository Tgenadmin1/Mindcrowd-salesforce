public without sharing class TestContactCtrl {
    @AuraEnabled
    public static Contact updateContact(Contact conObj){
        upsert conObj;
        return conObj;
    }

    @AuraEnabled
    public static Contact getRecord(String recordId){
        return [SELECT Id,FirstName,LastName,Email,Phone FROM Contact WHERE Id=:recordId LIMIT 1];
    }
}