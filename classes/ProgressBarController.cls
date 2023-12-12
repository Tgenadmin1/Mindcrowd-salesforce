/*
 * 
  Created By: {Girikon(Pramod Kumar)}
  Created On: 07/27/2021
  Description/Purpose:Query on Contact to fetch value of progress count[ticket No-: TM-125]
  Method -- getProgressMap
  Test Class-- ProgressBar_Test
  Modification log --
  Modified By: {Girikon(Pramod Kumar)} 
  Modified On: 07/30/2021

  Apex code on contact for fetching value of progress 
  *
  */
  public without sharing  class ProgressBarController 
  {
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getProgressMap()
    {
    Map<String, String> rtMap = new Map<String, String>();
    
    AggregateResult ar =[Select count(id) From Contact];
    double count=double.valueOf(ar.get('expr0'));
     //   double count = 500011;
        String retValue= String.valueOf(count);
        double countK=0;
        //Appending value with K whenever value is greater than 999
        if(count >= 1000)
        {
            countK=double.valueOf(count);
            retValue = String.valueOf(countK);
        }
        //Appending value with M whenever value is greater than 999999
        if( countK >= 1000)
        {
            double th=double.valueOf(countK);
            retValue = String.valueOf(th);
        }
        //Percentage Calculation
        //String calcPrcnt=String.valueOf((Math.log10(count)/Math.log10(1000000))*100);
        String calcPrcnt=String.valueOf((count/1000000)*100);
        rtMap.put('count',retValue);
        rtMap.put('Percentage',calcPrcnt);
        return rtMap;
    }
  }