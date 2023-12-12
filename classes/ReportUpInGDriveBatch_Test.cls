/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 24/6/2022
  Description/Purpose: This batch class is to upload files into google drive 
  Apex Class-- ReportUpInGDriveBatch
  
 *
 */
@isTest(seeAlldata = true)
public class ReportUpInGDriveBatch_Test {
  public static integer resP;
    @isTest 
    public static void testbarchClass() {
        //Test.setMock(HttpCalloutMock.class, new RestMock());
        try{
        Test.setMock(HttpCalloutMock.class, new RestMock());
        if(resP == 200){
       
        List<Report> reportList2 = [SELECT Id,DeveloperName,Name FROM Report where Name = 'Sample Report: Closed Sales']; 
        
        List<ReportUploadToDrive__c> rUploadLst = new  list<ReportUploadToDrive__c>();
        ReportUploadToDrive__c rUpload = new ReportUploadToDrive__c();
        rUpload.Name = 'testing';
        rUpload.Folder_Id__c = null;
       
        rUpload.Folder_Id_Created__c = false;
        rUploadLst.add(rUpload);
        insert rUploadLst;
        
        List<MindCrowd_Report__c> minReportLst = new List<MindCrowd_Report__c>();
        MindCrowd_Report__c minReport = new MindCrowd_Report__c();
        minReport.Name = 'SampleReportTopAccounts';
        minReport.Already_Run__c = false;
        minReportLst.add(minReport);
        insert minReportLst;
        
        }
       
        Test.startTest();
        ReportUpInGDriveBatch report = new ReportUpInGDriveBatch();
        Id jobid= Database.executeBatch(report,200);
        //report.createFolder();
        Test.stopTest();
        }catch(exception ex){
            
        }
    }
    @isTest 
    public static void testbarchClass1() {
        //Test.setMock(HttpCalloutMock.class, new RestMock());
        try{
        Test.setMock(HttpCalloutMock.class, new RestMock());
        if(resP == 200){
                
        List<Report> reportList2 = [SELECT Id,DeveloperName,Name FROM Report where Name = 'Sample Report: Closed Sales']; 
        
        List<ReportUploadToDrive__c> rUploadLst = new  list<ReportUploadToDrive__c>();
        ReportUploadToDrive__c rUpload = new ReportUploadToDrive__c();
        rUpload.Name = 'testing';
        rUpload.Folder_Id__c = null;
       
        rUpload.Folder_Id_Created__c = false;
        rUploadLst.add(rUpload);
        insert rUploadLst;
        
        
        
        }
       
        Test.startTest();
        ReportUpInGDriveBatch report = new ReportUpInGDriveBatch();
        Id jobid= Database.executeBatch(report,200);
        //report.createFolder();
        Test.stopTest();
        }catch(exception ex){
            
        }
    }
     
    public class RestMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            String fullJson = '{"access_token": "ya29.a0ARrdaM-imL16kTJ0JnRXxHwzxINpDB6kkt4yVVUk21qHnaWE_OjBMpYRMh_2hKVx2jkKJbwC_OGrhnax36_jH1DqlpdBeIdQ_035tioCNdE8V51S5JQrjY4-EaLpwlVHK41xmj_QyIC8dyjdhRUjqcsj3gSgVA","expires_in": 3599,"scope": "https://www.googleapis.com/auth/drive", "token_type": "Bearer"}';
            
           // String fullJson = '{"client_secret" : "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", "grant_type" : "refresh_token", "refresh_token" : "1%2F%2F04Im3mnO37rHJCgYIARAAGAQSNwF-L9Ir6qWt59ZbLeat7Xqia8ql6OS583ntMZYw4C8Y2sYnxiA7UD2PNal27lIdQKOt0uP-bzA", "client_id" : "713030521937-qghu014kf00h6s75a42e1p3j229324l9.apps.googleusercontent.com"}';
            
            HTTPResponse res = new HTTPResponse();
            res.setHeader('Content-Type', 'text/json');
            res.setBody(fullJson);
            res.setStatusCode(200);
            resP =  200;
            return res;
        }
    }
}