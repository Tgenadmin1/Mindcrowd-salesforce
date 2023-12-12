/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 24/6/2022
  Description/Purpose: This batch class is to upload files into google drive 
  Apex Class-- ReportUpInGDriveBatch
  
 *https://mindcrowd2--dev.my.salesforce.com/_ui/common/apex/debug/ApexCSIPage#
 */
public class ReportUpInGDriveBatch implements Database.batchable<sObject>,Database.AllowsCallouts,database.stateful {
    
    
    /*
     * //rajjames5000@gmail.com (james raj)
    private string key = 234943907203-vqb55ubhj92a2abg9ofcn2o8imv49se3.apps.googleusercontent.com;	//client key
	private string Client_Secret = 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;// 	client secret key
	private string refresh_token = 1%2F%2F04EHuXlNeDwmOCgYIARAAGAQSNwF-L9IrjL-WrnSphLTTTnBd8zFdfgaorl32MrZKqeDM54vH9EglX7Bsx7acRxSJ2W3PzF48M2o; 	//refresh token from drive 
    */
    
    
    //public String reportDevName = 'SampleReportofAccounts';
    //Rohit45
    private string key;//client key
    private string Client_Secret;// client secret key
    private string refresh_token;//refresh token from drive 
    private string refreshToken;
    public String  driveId;// drive id to upload file 
    public string url;
    public  String accesstoken;
    private Integer expiresIn;
    private String tokentype;
    public  String folderId;
	public integer errorLineNumber;
	public  string errorMessage;
    public  list<ReportUploadToDrive__c> rUpload1 = new  list<ReportUploadToDrive__c>();
    public  list<ReportUploadToDrive__c> rUpload = new  list<ReportUploadToDrive__c>();
    list<MindCrowd_Report__c > reportDevName1 = new list<MindCrowd_Report__c >();
    list<MindCrowd_Report__c > reportDevName = new list<MindCrowd_Report__c >();
    list<Report>rportList = new list<Report>();
    public ReportUpInGDriveBatch(){
         reportDevName =  [select Name,Already_run__c,Report_Name__c from MindCrowd_Report__c  where  Already_run__c = false AND Survey_Report__c = false limit 1];// to get the report name from the object 
         rUpload = [select id,Name, Client_secret__c, Drive_Id__c,Key__c, Folder_Id__c, Folder_Id_Created__c, Refresh_Token__c from ReportUploadToDrive__c  limit 1];// to get the credentials for gdrive upload 
         key = rUpload[0].Key__c;
		 Client_Secret=rUpload[0].Client_secret__c;
		 driveId= rUpload[0].Drive_Id__c;
		 refresh_token = rUpload[0].Refresh_Token__c;
	     
        //accesstoken = AccessToken();
        
    }
    // method to get the report 
    public Iterable<sObject> start(Database.BatchableContext BC){
       List<Report> reportList = new list<Report>();
        if(reportDevName.size()>0  ){
           reportList = [SELECT Id,DeveloperName,Name FROM Report where DeveloperName =:reportDevName[0].Name ];
        }
            return reportList;
    }
    
    public void execute(Database.BatchableContext BC, List<sObject> scope){
        try
        {
            date yesterDy = date.today().adddays(-1);
            accesstoken = AccessToken();
          /*  if( rUpload[0].Folder_Id_Created__c == false){
               folderId = createFolder(); // to create the folder id for the 1st time in a day 
              
            }else{
                folderId =  rUpload[0].Folder_Id__c;// after 1st run to get the folder id from custom setting to move file in tot he same folder 
            }*/
            if(scope.size()>0 )
            {
                string reportName;
                String reportId = (String)scope.get(0).get('Id');
                if(scope.get(0).get('DeveloperName') == reportDevName[0].Name){
                   reportName = reportDevName[0].Report_Name__c +'_' +string.valueOf(yesterDy);
                }
                
                string url = '/'+reportId+'?csv=1&isdtp=p1';
                ApexPages.PageReference objPage = new ApexPages.PageReference(url);
                //blob urlStor = objPage.getContent();// csv file creation of report  
                String boundary = 'SalesforceNewsTechnologyStuff9889464542212'; String delimiter = '\r\n--' + boundary + '\r\n';
                String close_delim = '\r\n--' + boundary + '--'; //String bodyEncoded = EncodingUtil.base64Encode(urlStor);
                /*String body = delimiter + 'Content-Type: application/json\r\n\r\n' + '{ "name" : "' + reportName+'.csv' + '",' + ' "mimeType" : "text/csv",' + 
                    '"teamDriveId": "'+driveId+'",\n  "driveId": "'+driveId+'",\n  "parents":[\n	"'+driveId+'"\n	]}' + 
                    delimiter + 'Content-Type: text/application/vnd.ms-excel' + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n'
                    + bodyEncoded + close_delim; */
                String endpoint= 'https://www.googleapis.com/upload/drive/v3/files?driveId='+driveId+'&includeItemsFromAllDrives=true&corpora=drive&supportsAllDrives=true&uploadType=multipart';
                
                Http http = new Http();
                HttpRequest req = new HttpRequest();
                req.setEndpoint(endpoint);    req.setHeader('Authorization', 'Bearer ' + accesstoken);
                req.setHeader('Content-Type', 'multipart/mixed; boundary="' + boundary + '"');
                req.setHeader('Content-length', '10000');
                req.setBody(delimiter + 'Content-Type: application/json\r\n\r\n' + '{ "name" : "' + reportName+'.csv' + '",' + ' "mimeType" : "text/csv",' + 
                    '"teamDriveId": "'+driveId+'",\n  "driveId": "'+driveId+'",\n  "parents":[\n	"'+driveId+'"\n	]}' + 
                    delimiter + 'Content-Type: text/application/vnd.ms-excel' + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n'
                    + EncodingUtil.base64Encode(objPage.getContent()) + close_delim);
                req.setMethod('POST');
                req.setTimeout(60 * 1000);
                HttpResponse resp = http.send(req);
                String resp2 = resp.getBody();
                if(resp.getStatusCode() == 200){if(reportDevName.size()>0){ reportDevName[0].Already_run__c = true;reportDevName1.add(reportDevName[0]);update reportDevName1;
            }
                }
            }   
        }
        catch(Exception ex){
            
			errorMessage = ex.getMessage();
			errorLineNumber  = ex.getLineNumber();
        }
    }
    
    public void finish(Database.BatchableContext BC){
       // if(test.isRunningTest()){errorMessage = 'test';}
      
        if(reportDevName.size()>0){
            rportList = [SELECT Id,DeveloperName,Name FROM Report where DeveloperName =:reportDevName[0].Name];
          // to re run the batch class for allt he reprots 
            if(!test.isRunningTest()) {if(rportList.size()>0){ Database.executeBatch(new ReportUpInGDriveBatch(), 200);}}}else{   list<MindCrowd_Report__c> rList = new list<MindCrowd_Report__c>(); for(MindCrowd_Report__c r:  [select Name,Already_run__c from MindCrowd_Report__c]){ r.Already_run__c = false; rList.add(r); } update rList;/*if(rUpload[0] != null){ rUpload[0].Folder_Id__c =''; rUpload[0].Folder_Id_Created__c = false;  rUpload1.add(rUpload[0]);  update rUpload1;*/
        }
        }
    
    // to genrate the access token 
    public string AccessToken() {
        //Getting access token from google
		
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setEndpoint('https://accounts.google.com/o/oauth2/token');               
        req.setHeader('content-type', 'application/x-www-form-urlencoded');                 
        String messageBody = 'client_secret='+Client_Secret+'&grant_type=refresh_token'+'&refresh_token='+refresh_token+'&client_id='+key;  
        req.setHeader('Content-length', String.valueOf(messageBody.length()));
        req.setBody(messageBody);
        req.setTimeout(60 * 1000);
        Http h = new Http();
        HttpResponse res = h.send(req);
        String resp = res.getBody();    
       	
        JSONParser parser = JSON.createParser(resp);    
        while (parser.nextToken() != null) {
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME)) {
                String fieldName = parser.getText();
                parser.nextToken();
                if (fieldName == 'access_token') {
                    accesstoken = parser.getText();
                } else if (fieldName == 'expires_in') {
                    expiresIn = parser.getIntegerValue();
                } else if (fieldname == 'token_type') {
                    tokentype = parser.getText();
                }
            } 
        
      }
        return accesstoken;
    }
    /* to create the folder id 
    public String createFolder()
    {
        //Local variable declarations
        //folder search
        //String driveId = '1FpYEJUHSvgtzd-m0X3c7DAku0_JRngSq';
        String folderId;
        string folderName = 'tttttttt'+system.now().format('MM.dd.yyyy');
        folderName = 'name=\''+folderName+'\'';
        folderName = EncodingUtil.urlencode(folderName,'UTF-8');
        string searchFolderEndpoint = 'https://www.googleapis.com/drive/v3/files?driveId='+driveId+'&includeItemsFromAllDrives=true&corpora=drive&supportsAllDrives=true&q='+folderName;
        
        Http https1 = new Http();
        HttpRequest requ1 = new HttpRequest(); 
        HttpResponse respo1 = new HttpResponse();
        
        //method execution
        requ1.setMethod('GET');
        requ1.setEndpoint(searchFolderEndpoint);
        requ1.setHeader('Authorization','Bearer '+ accesstoken);
        respo1 = https1.send(requ1);
        if(String.isEmpty(folderId))
        {
            //folder create
            String Endpoint = 'https://www.googleapis.com/upload/drive/v3/files?driveId='+driveId+'&includeItemsFromAllDrives=true&corpora=drive&supportsAllDrives=true&uploadType=multipart';
            datetime d1 = system.now();
            string body = '--287032381131322\nContent-Type: application/json\n\n{\n  "name": "'+system.now().format('yyyy.MM.dd')+'_Reports",\n  "mimeType": "application/vnd.google-apps.folder",\n  "description": "Stuff about the file",\n  "teamDriveId": "'+driveId+'",\n  "driveId": "'+driveId+'",\n  "parents":[\n	"'+driveId+'"\n	]\n}\n--287032381131322\nContent-Type: application/vnd.google-apps.folder\n\n\'testing body\'\n--287032381131322--';
            Http https = new Http();
            HttpRequest requ = new HttpRequest(); 
            HttpResponse respo = new HttpResponse();
            
            //method execution
            requ.setMethod('POST');
            requ.setEndpoint(Endpoint);
            requ.setHeader('content-type', 'multipart/form-data; boundary=287032381131322');
            requ.setHeader('Authorization','Bearer '+ accesstoken);
            requ.setBody(body);
            respo = https.send(requ);
            string respo44 = respo.getBody();
            
            GoogleResponses.GoogleFolder obj = (GoogleResponses.GoogleFolder)JSON.deserialize(respo.getbody(),GoogleResponses.GoogleFolder.class);
            folderId = obj.id;
            if(respo.getStatusCode() == 200){
               rUpload[0].Folder_Id__c =folderId;
               rUpload[0].Folder_Id_Created__c = true;//date.today();
               rUpload1.add(rUpload[0]);
               update rUpload1;
            }
            return folderId; } else {return folderId; }
		
        
}*/
}