@IsTest
public with sharing class TestContactCtrl_Test {
    @IsTest
    private static void test(){
        Contact conObj = new Contact();
        conObj.LastName = 'tets';
        
        conObj = TestContactCtrl.updateContact(conObj);
        TestContactCtrl.getRecord(conObj.Id);
    }
}