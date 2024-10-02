// Created By: {Girikon(Shweta Khunteta)}
// Created On: 06/08/2021
// Description/Purpose: Why and where it is used [TM-186]-It was created to  print the labels of      selectedShipping ids 
//
// 
// Methods: {doSomething}
// Test Class: {PrintLabelControllerTest} {Code Coverage:94%}

public with sharing class PrintLabelController 
{       
    public Integration_Settings__c customSettingAddress{get;set;}
    public List<Shipping_Detail__c> shippingDetailList{get;set;}
    
    public PrintLabelController(ApexPages.StandardSetController standardSetController) 
    {
        List<Shipping_Detail__c> selectedItems = standardSetController.getSelected();

        // List<Integration_Settings__c> isList = [SELECT Id, MindCrowdAddress2__c, MindCrowdCity__c,MindCrowdName__c,
        //                         MindCrowdState__c, MindCrowdZip5__c FROM Integration_Settings__c Where Name='Integration Settings' WITH SECURITY_ENFORCED];
        
        // customSettingAddress = new Integration_Settings__c();
        // if(!isList.isEmpty()){
        //     customSettingAddress = isList[0];
        // }

        shippingDetailList = [SELECT Id, USPSLabelImage__c,USPSReturnLabelImage__c FROM Shipping_Detail__c
                              WHERE Id IN :selectedItems AND Tracking_Id__c!=null WITH SECURITY_ENFORCED];                
    }
}