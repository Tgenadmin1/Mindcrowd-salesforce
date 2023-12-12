({	
	ctr : function(cmp, event, helper) {
        console.log('helooooo');
        let temp = cmp.get('v.chartData');
         console.log('chartData--',temp);
        helper.createGraph(cmp, temp);
	}
})