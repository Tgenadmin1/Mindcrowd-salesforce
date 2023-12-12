({   
    doInit : function(component) {
        let firstClick = localStorage.getItem('firstclick');
        if(localStorage.getItem('vipresult')=='false' || (firstClick != 'recent' && firstClick != 'longFraph') ){
        component.set('v.isInit',true);
        component.set('v.isRecResults',false);
        component.set('v.isLongGraph',false);
        localStorage.setItem('vipresult','true');
        localStorage.setItem('firstclick','true');
        }
        if(localStorage.getItem('firstclick') =='recent'){
            component.set('v.isRecResults',true);
            component.set('v.isLongGraph',false);
            component.set('v.isInit',false);
        }
        else if(localStorage.getItem('firstclick') =='longFraph'){
            component.set('v.isLongGraph',true);
            component.set('v.isInit',false);
            component.set('v.isRecResults',false); 
        }
    },
    goToRecentResult : function(component, event, helper) {
            component.set('v.isRecResults',true);
            component.set('v.isLongGraph',false);
            component.set('v.isInit',false);
            if(localStorage.getItem('firstclick') =='true'){
                localStorage.setItem('firstclick','recent');
            }            
    },
    goToLongGraph: function (component, event, helper) {    
            component.set('v.isLongGraph',true);
            component.set('v.isInit',false);
            component.set('v.isRecResults',false);
            if(localStorage.getItem('firstclick') =='true'){
                localStorage.setItem('firstclick','longFraph');
            }                
    },
})