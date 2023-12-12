public with sharing class RecursiveTriggerHandler {
    private static boolean run = true;
    public static boolean runOnce(){
        if(run){
            run=false;
            return true;
        }
        else{
            return run;
        }
    }

    public static void allowOnce(){
        run = true;
    }
}