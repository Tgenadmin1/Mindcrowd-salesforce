/*
 * 
  Created By: {Girikon(Rohit Dua)}
  Created On: 24/6/2022
  Description/Purpose: wrapper class for   ReportUpInGDriveBatch for csv file upload in google drive 
  Apex Class-- GoogleResponses
  
 *
 */
public class GoogleResponses 
{
    GoogleFolder gfolder =  new GoogleFolder();
 
    public class GoogleFolder
    {
        public string kind;
        public string id;
        public string name;
        public string mimeType;
        public string teamDriveId;
        public string driveId;        
    }
    
    
}